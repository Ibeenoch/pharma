import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";
import { ProductDataProps } from "../../../types/product/ProductData";
import * as api from "./productService";
import { UpdateProductCart } from "../../../types/cart/CartData";

interface productAdminState {
  status: "idle" | "loading" | "success" | "failure";
  productAdmin: ProductDataProps[];
  hasFetchAllProduct: boolean;
  productIndexClicked: string;
  productSubTabIndex: number;
  productSubTabRoute: string;
}

const initialState: productAdminState = {
  status: "idle",
  productAdmin: [],
  hasFetchAllProduct: false,
  productIndexClicked: "",
  productSubTabIndex: 0,
  productSubTabRoute: "",
};

export const createProduct = createAsyncThunk(
  "product/create",
  async (productData: FormData, { rejectWithValue }) => {
    try {
      return await api.createProduct(productData);
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const updateProduct = createAsyncThunk<
  ProductDataProps, // This is the type of the return value (action.payload)
  FormData, // This is the input type (productData)
  { rejectValue: string }
>(
  "product/updateProduct",
  async (productData: FormData, { rejectWithValue }) => {
    try {
      return await api.updateProduct(productData);
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const updateProductStockQuantity = createAsyncThunk(
  "product/updateProductStockQuantity",
  async (stockData: UpdateProductCart, { rejectWithValue }) => {
    try {
      return await api.updateProductStockQty(stockData);
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const fetchAllUserProduct = createAsyncThunk(
  "product/fetchAllUserProduct",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await api.allProduct(userId);
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const deleteproduct = createAsyncThunk(
  "product/deleteproduct",
  async (projectId: string, { rejectWithValue }) => {
    try {
      return await api.deleteProduct(projectId);
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const productAdminSlice = createSlice({
  name: "productAdmin",
  initialState,
  reducers: {
    invalidateFetchAllProductCache: (state, action: PayloadAction<boolean>) => {
      state.hasFetchAllProduct = false;
    },
    setProductIndexClicked: (state, action: PayloadAction<string>) => {
      state.productIndexClicked = action.payload;
    },
    setProductSubTabIndex: (state, action: PayloadAction<number>) => {
      state.productSubTabIndex = action.payload;
    },
    setProductSubTabRoute: (state, action: PayloadAction<string>) => {
      state.productSubTabRoute = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          state.productAdmin.push(action.payload);
        }
      })
      .addCase(createProduct.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          const index = state.productAdmin.findIndex(
            (p) => p.$id === action.payload?.$id
          );
          state.productAdmin[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(updateProductStockQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductStockQuantity.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          const index = state.productAdmin.findIndex(
            (p) => p.$id === action.payload?.$id
          );
          console.log(
            "index update ",
            index,
            "updateProductStockQuantity ",
            action.payload
          );
          state.productAdmin[index] = action.payload;
        }
      })
      .addCase(updateProductStockQuantity.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(deleteproduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteproduct.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          // const index = state.productAdmin.findIndex(
          //   (p) => p.$id === action.payload?.$id
          // );
          // console.log("index update ", index);
          // state.productAdmin.splice(index, 1);
        }
      })
      .addCase(deleteproduct.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(fetchAllUserProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUserProduct.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          state.hasFetchAllProduct = true;
          state.productAdmin = action.payload;
        }
      })
      .addCase(fetchAllUserProduct.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export const selectproductAdmin = (state: RootState) => state.productAdmin;
export const {
  invalidateFetchAllProductCache,
  setProductIndexClicked,
  setProductSubTabIndex,
  setProductSubTabRoute,
} = productAdminSlice.actions;
export default productAdminSlice.reducer;
