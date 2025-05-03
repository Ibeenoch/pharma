import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./orderService";
import {
  AllOrderResultData,
  OrderArgs,
  OrderPaginatedArgs,
  OrderPaginatedFilteredArgs,
  OrderProps,
  OrderStatusProps,
  ShippingDetailsProps,
  ShippingServiceProps,
  UpdateShippingArgs,
} from "../../types/order/OrderType";
import { RootState } from "../../redux/store";
import { TransactionDateFilterProps, TransactionProps } from "../../types/payment/FlutterwavePaymentType";

interface orderState {
  hasShippingDetailsSubmitted: boolean;
  shippingDetail: ShippingDetailsProps;
  hasPreviousShippingDetails: boolean;
  status: "idle" | "loading" | "success" | "failure";
  transactions: TransactionProps[];
  transaction: TransactionProps;
  order: AllOrderResultData;
  orders: AllOrderResultData[];
  refreshOrder: boolean;
  refreshAnOrder: boolean;
  refreshTransaction: boolean;
  refreshATransaction: boolean;
  totalRevenue: number;
  totalOrderPage: number;
  totalTransactionPage: number;
  shippingService: ShippingServiceProps;
}

const initialState: orderState = {
  shippingService: {
    shippingStatus: "",
    shippingType: "",
  },
  hasPreviousShippingDetails: false,
  totalOrderPage: 0,
  shippingDetail: {
    userId: "",
    address: "",
    country: "",
    lga: "",
    phoneNumber: "",
    state: "",
    zipcode: "",
    email: "",
    fullname: "",
  },
  order: {
    $id: "",
    $createdAt: "",
    $updatedAt: "",
    orderStatus: "",
    cart: [
      {
        $id: "",
        $createdAt: "",
        $updatedAt: "",
        brand: "",
        cartId: "",
        category: "",
        creator: "",
        description: "",
        discount: 0,
        imagesUrl: [],
        name: "",
        productId: "",
        productSerialNo: "",
        quantity: 0,
        price: 0,
        subtotal: 0,
        total: 0,
      },
    ],
    userId: "",
    shippingDetails: {
      userId: "",
      address: "",
      country: "",
      lga: "",
      phoneNumber: "",
      state: "",
      zipcode: "",
      $createdAt: "",
      $id: "",
      $updatedAt: "",
      fullname: "",
      email: "",
    },
    transaction: {
      $id: "",
      status: "",
      transactionId: "",
      transactionRef: "",
      payerId: "",
      payMethod: "",
      $createdAt: "",
      $updatedAt: "",
      amount: 0,
      shippingId: "",
      shippingStatus: "",
      shippingType: "",
    },
  },
  orders: [
    {
      $id: "",
      userId: "",
      cart: [
        {
          $id: "",
          $createdAt: "",
          $updatedAt: "",
          brand: "",
          cartId: "",
          category: "",
          creator: "",
          description: "",
          discount: 0,
          imagesUrl: [],
          name: "",
          productId: "",
          productSerialNo: "",
          quantity: 0,
          price: 0,
          subtotal: 0,
          total: 0
        },
      ],
      shippingDetails: {
        userId: "",
        address: "",
        country: "",
        lga: "",
        phoneNumber: "",
        state: "",
        zipcode: "",
        $createdAt: "",
        $id: "",
        $updatedAt: "",
        fullname: "",
        email: "",
      },
      transaction: {
        $id: "",
        status: "",
        transactionId: "",
        amount: 0,
        transactionRef: "",
        payerId: "",
        payMethod: "",
        $createdAt: "",
        $updatedAt: "",
        shippingId: "",
        shippingStatus: "",
        shippingType: "",
      },
      $createdAt: "",
      $updatedAt: "",
      orderStatus: "",
    },
  ],
  refreshOrder: false,
  refreshAnOrder: false,
  refreshTransaction: false,
  refreshATransaction: false,
  hasShippingDetailsSubmitted: false,
  status: "idle",
  transaction: {
    amount: 0,
    payerId: "",
    status: "",
    transactionId: "",
    transactionRef: "",
    $id: "",
    createdAt: "",
    payMethod: "",
    customerName: "", // started now
    imageUrl: [],
    productName: [],
    productQty: [],
    shippingId: "",
    shippingStatus: "",
    shippingType: "",
  },
  transactions: [],
  totalRevenue: 0,
  totalTransactionPage: 0,
};

export const postTransaction = createAsyncThunk(
  "order/postTransaction",
  async (transactionData: TransactionProps, { rejectWithValue }) => {
    try {
      return await api.saveTransaction(transactionData);
    } catch (error: any) {
      return rejectWithValue(
        error.message || "failed to post transaction details"
      );
    }
  }
);

export const totalOrderPages = createAsyncThunk(
  "order/totalOrderPages",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getTotalOrderPages();
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to get total order page");
    }
  }
);

export const totalTrasactionPages = createAsyncThunk(
  "order/totalTrasactionPages",
  async (_, { rejectWithValue }) => {
    try {
      return await api.gettotalTrasactionPages();
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to get total order page");
    }
  }
);

export const getATransaction = createAsyncThunk(
  "order/getATransaction",
  async (id: string, { rejectWithValue }) => {
    try {
      return await api.getATransaction(id);
    } catch (error: any) {
      return rejectWithValue(
        error.message || "failed to get a transaction details"
      );
    }
  }
);

export const getAllTransaction = createAsyncThunk(
  "order/getAllTransaction",
  async (pageNum: number, { rejectWithValue }) => {
    try {
      return await api.getAllTransaction(pageNum);
    } catch (error: any) {
      return rejectWithValue(
        error.message || "failed to get all transaction details"
      );
    }
  }
);

export const getAllTransactionFilteredByDate = createAsyncThunk(
  "order/getAllTransactionFilteredByDate",
  async (pageData: TransactionDateFilterProps, { rejectWithValue }) => {
    try {
      return await api.getAllTransactionFilteredByDate(pageData);
    } catch (error: any) {
      return rejectWithValue(
        error.message || "failed to get all transaction details"
      );
    }
  }
);

export const getAllTransactionWithoutPagination = createAsyncThunk(
  "order/getAllTransactionWithoutPagination",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getAllTransactionWithoutPagination();
    } catch (error: any) {
      return rejectWithValue(
        error.message || "failed to get all transaction details"
      );
    }
  }
);

export const postShippingDetails = createAsyncThunk(
  "order/postdetails",
  async (shippingDetails: ShippingDetailsProps, { rejectWithValue }) => {
    try {
      return await api.addShippingDetails(shippingDetails);
    } catch (error: any) {
      return rejectWithValue(
        error.message || "failed to post shipping details"
      );
    }
  }
);

export const updateShippingDetails = createAsyncThunk(
  "order/updatedetails",
  async (shippingDetails: UpdateShippingArgs, { rejectWithValue }) => {
    try {
      return await api.updateShippingDetails(shippingDetails);
    } catch (error: any) {
      return rejectWithValue(
        error.message || "failed to update shipping details"
      );
    }
  }
);

export const getShippingDetails = createAsyncThunk(
  "order/getdetails",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await api.getShippingDetails(userId);
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to get shipping details");
    }
  }
);

export const postOrder = createAsyncThunk(
  "order/postOrder",
  async (orderData: OrderProps, { rejectWithValue }) => {
    try {
      return await api.createOrder(orderData);
    } catch (error: any) {
      return rejectWithValue(
        error.message || "failed to post shipping details"
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async (orderData: OrderStatusProps, { rejectWithValue }) => {
    try {
      return await api.updateOrderStatus(orderData);
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to update order");
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (orderData: OrderArgs, { rejectWithValue }) => {
    try {
      return await api.findOrder(orderData);
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to get order details");
    }
  }
);

export const getAllOrder = createAsyncThunk(
  "order/getAllOrder",
  async (data: OrderPaginatedArgs, { rejectWithValue }) => {
    try {
      return await api.findAllOrders(data);
    } catch (error: any) {
      return rejectWithValue(
        error.message || "failed to get all orders details"
      );
    }
  }
);

export const getAllFilteredOrderByDate = createAsyncThunk(
  "order/getAllFilteredOrderByDate",
  async (data: OrderPaginatedFilteredArgs, { rejectWithValue }) => {
    try {
      return await api.filterOrdersWithDate(data);
    } catch (error: any) {
      return rejectWithValue(
        error.message || "failed to get all orders details"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetShippingDetails: (state) => {
      state.shippingDetail = {
        userId: "",
        address: "",
        country: "",
        lga: "",
        phoneNumber: "",
        state: "",
        zipcode: "",
        fullname: "",
        email: "",
      };
      state.hasPreviousShippingDetails = false;
    },
    calcualateTotalRevenue: (state) => {
      state.totalRevenue = state.transactions.reduce((acc, curr) => {
        const total = acc + curr.amount;
        return total;
      }, 0);
    },
    resetRefreshOrder: (state) => {
      state.refreshOrder = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(postShippingDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postShippingDetails.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.hasShippingDetailsSubmitted = true;
          state.shippingDetail = action.payload;
          state.refreshOrder = true;
          state.refreshAnOrder = true;
        }
      })
      .addCase(postShippingDetails.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(postTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postTransaction.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.transaction = action.payload;
          state.refreshTransaction = true;
          state.refreshATransaction = true;
          state.refreshOrder = true;
        }
      })
      .addCase(postTransaction.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getATransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getATransaction.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.transaction = action.payload;
          state.refreshATransaction = false;
        }
      })
      .addCase(getATransaction.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(postOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.order = action.payload;
          state.refreshOrder = true;
          state.refreshAnOrder = true;
        }
      })
      .addCase(postOrder.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          const index = state.orders.findIndex(
            (s) => (s.$id = action.payload.$id)
          );
          state.orders[index] = action.payload;
          state.refreshOrder = true;
          state.refreshAnOrder = true;
        }
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.order = action.payload;
          state.refreshAnOrder = false;
        }
      })
      .addCase(getOrder.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getAllOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.orders = action.payload;
          state.refreshOrder = false;
        }
      })
      .addCase(getAllOrder.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getAllFilteredOrderByDate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllFilteredOrderByDate.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          console.log('action order ', action.payload);
          state.orders = action.payload;
        }
      })
      .addCase(getAllFilteredOrderByDate.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getAllTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTransaction.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.transactions = action.payload;
          state.refreshTransaction = false;
        }
      })
      .addCase(getAllTransaction.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getAllTransactionFilteredByDate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTransactionFilteredByDate.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.transactions = action.payload;
          state.refreshTransaction = false;
        }
      })
      .addCase(getAllTransactionFilteredByDate.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getAllTransactionWithoutPagination.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTransactionWithoutPagination.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.transactions = action.payload;
          state.refreshTransaction = false;
        }
      })
      .addCase(getAllTransactionWithoutPagination.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(totalOrderPages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(totalOrderPages.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.totalOrderPage = action.payload;
        }
      })
      .addCase(totalOrderPages.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(totalTrasactionPages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(totalTrasactionPages.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.totalTransactionPage = action.payload;
        }
      })
      .addCase(totalTrasactionPages.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(updateShippingDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateShippingDetails.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.shippingDetail = action.payload;
          // set hasShippingDetailsSubmitted to false to get the updated shipping address
          state.hasShippingDetailsSubmitted = false;
          state.refreshOrder = true;
          state.refreshAnOrder = true;
        }
      })
      .addCase(updateShippingDetails.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getShippingDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getShippingDetails.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          state.shippingDetail = action.payload;
          state.hasPreviousShippingDetails = true;
        } else {
          state.shippingDetail = {
            userId: "",
            address: "",
            country: "",
            lga: "",
            phoneNumber: "",
            state: "",
            zipcode: "",
            fullname: "",
            email: "",
          };
          state.hasPreviousShippingDetails = false;
        }
      })
      .addCase(getShippingDetails.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export const selectOrder = (state: RootState) => state.order;
export const {
  resetShippingDetails,
  calcualateTotalRevenue,
  resetRefreshOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
