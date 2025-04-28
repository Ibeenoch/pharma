import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";
import { PrescriptionProps, ProductDataProps } from "../../../types/product/ProductData";
import * as api from "./productService";
import { UpdateProductCart } from "../../../types/cart/CartData";

interface productAdminState {
  status: "idle" | "loading" | "success" | "failure";
  productAdmin: ProductDataProps[];
  productSearched: ProductDataProps[];
  prescription: PrescriptionProps[];
  hasFetchAllProduct: boolean;
  hasFetchAllPrescription: boolean;
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
  productSearched: [],
  prescription: [],
  hasFetchAllPrescription: false,

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

export const createPrescription = createAsyncThunk(
  "prescription/create",
  async (prescriptionData: PrescriptionProps, { rejectWithValue }) => {
    try {
      return await api.addPrescription(prescriptionData);
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

export const updatePrescription = createAsyncThunk(
  "prescript/updatePrescription",
  async (prescriptData: PrescriptionProps, { rejectWithValue }) => {
    try {
      return await api.updatePrescription(prescriptData);
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
  async (_, { rejectWithValue }) => {
    try {
      return await api.allProduct();
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const fetchAllPrescriptions = createAsyncThunk(
  "prescription/fetchAllPrescriptions",
  async (_, { rejectWithValue }) => {
    try {
      return await api.allPrescription();
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const searchedProduct = createAsyncThunk(
  "product/searchedProduct",
  async (searchedKey: string, { rejectWithValue }) => {
    try {
      return await api.searchProduct(searchedKey);
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

export const deletePrescription = createAsyncThunk(
  "prescription/deletePrescription",
  async (prescriptionId: string, { rejectWithValue }) => {
    try {
      return await api.deletePrescription(prescriptionId);
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
    resetSearchProduct: (state) => {
      state.productSearched = [];
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
      .addCase(createPrescription.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPrescription.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          console.log('prescription payload', action.payload)
          state.prescription.push(action.payload);
        }
      })
      .addCase(createPrescription.rejected, (state) => {
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
      .addCase(updatePrescription.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePrescription.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          const index = state.prescription.findIndex(
            (p) => p.$id === action.payload?.$id
          );
          state.prescription[index] = action.payload;
          console.log('update prescription ', action.payload)
        }
      })
      .addCase(updatePrescription.rejected, (state) => {
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
        }
      })
      .addCase(deleteproduct.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(deletePrescription.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePrescription.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
        }
      })
      .addCase(deletePrescription.rejected, (state) => {
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
      })
      .addCase(fetchAllPrescriptions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPrescriptions.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          state.hasFetchAllPrescription = true;
          state.prescription = action.payload;
          console.log('all prescription payload ', action.payload)
        }
      })
      .addCase(fetchAllPrescriptions.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(searchedProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchedProduct.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          console.log("action.payload  ", action.payload);
          state.productSearched = action.payload;
        }
      })
      .addCase(searchedProduct.rejected, (state) => {
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
  resetSearchProduct,
} = productAdminSlice.actions;
export default productAdminSlice.reducer;
