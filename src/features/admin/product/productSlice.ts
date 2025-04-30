import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";
import { PrescriptionProps, ProductDataProps, UpdatedHotProductProps } from "../../../types/product/ProductData";
import * as api from "./productService";
import { UpdateProductCart } from "../../../types/cart/CartData";

interface productAdminState {
  status: "idle" | "loading" | "success" | "failure";
  productAdmin: ProductDataProps[]; // with pagination
  allProduct: ProductDataProps[]; // without pagination
  productSearched: ProductDataProps[];
  prescription: PrescriptionProps[]; // with pagination
  prescriptionWithoutPagination: PrescriptionProps[]; // without pagination
  hasFetchAllProduct: boolean;
  hasFetchAllProductWithoutPagination: boolean;
  hasFetchAllPrescription: boolean;
  hasFetchAllPrescriptionWithoutPagination: boolean;
  productIndexClicked: string;
  productSubTabIndex: number;
  productSubTabRoute: string;
  productCategoryName: string;
  totalProductPage: number;
  totalPrescriptionPage: number;
}

const initialState: productAdminState = {
  status: "idle",
  productAdmin: [],
  allProduct: [],
  hasFetchAllProduct: false,
  hasFetchAllProductWithoutPagination: false,
  productIndexClicked: "",
  productSubTabIndex: 0,
  productSubTabRoute: "",
  productSearched: [],
  prescription: [],
  prescriptionWithoutPagination: [],
  hasFetchAllPrescription: false,
  hasFetchAllPrescriptionWithoutPagination: false,
  productCategoryName: '',
  totalProductPage: 0,
  totalPrescriptionPage: 0,
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

export const updateHotProductNum = createAsyncThunk(
  "prescript/updateHotProductNum",
  async (updatedHotVal: UpdatedHotProductProps, { rejectWithValue }) => {
    try {
      return await api.updateHotProduct(updatedHotVal);
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
  async (pageNum: number, { rejectWithValue }) => {
    try {
      return await api.allProduct(pageNum);
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const fetchAllProductWithoutPagination = createAsyncThunk(
  "product/fetchAllProductWithoutpagination",
  async (_, { rejectWithValue }) => {
    try {
      return await api.allProductWithoutPagination();
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const totalProductPages = createAsyncThunk(
  "product/totalproductPages",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getTotalProductPages();
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to get total order page");
    }
  }
);

export const totalPrescriptionPages = createAsyncThunk(
  "prescription/totalPrescriptionPages",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getTotalPrescriptionPages();
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to get total order page");
    }
  }
);

export const fetchAllPrescriptions = createAsyncThunk(
  "prescription/fetchAllPrescriptions",
  async (pageNum: number, { rejectWithValue }) => {
    try {
      return await api.allPrescription(pageNum);
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const fetchAllPrescriptionsWithoutPagination = createAsyncThunk(
  "prescription/fetchAllPrescriptionsWithoutPagination",
  async (_, { rejectWithValue }) => {
    try {
      return await api.allPrescriptionWithoutPagination();
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

export const searchedProductBrand = createAsyncThunk(
  "product/searchedProductBrand",
  async (searchedKey: string, { rejectWithValue }) => {
    try {
      return await api.searchProductBrand(searchedKey);
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
    invalidateFetchAllPrescriptionCache: (state) => {
      state.hasFetchAllPrescription = false;
    },
    setProductIndexClicked: (state, action: PayloadAction<string>) => {
      state.productIndexClicked = action.payload;
    },
    setProductCategoryName: (state, action: PayloadAction<string>) => {
      state.productCategoryName = action.payload;
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
          state.productAdmin[index] = action.payload;
        }
      })
      .addCase(updateProductStockQuantity.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(updateHotProductNum.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateHotProductNum.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          const index = state.productAdmin.findIndex(
            (p) => p.$id === action.payload?.$id
          );
          state.productAdmin[index] = action.payload;
        }
      })
      .addCase(updateHotProductNum.rejected, (state) => {
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
      .addCase(fetchAllProductWithoutPagination.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductWithoutPagination.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          state.hasFetchAllProduct = true;
          state.allProduct = action.payload;
        }
      })
      .addCase(fetchAllProductWithoutPagination.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(fetchAllPrescriptions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPrescriptions.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          state.prescription = action.payload;
          console.log('all prescription payload ', action.payload)
        }
      })
      .addCase(fetchAllPrescriptions.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(fetchAllPrescriptionsWithoutPagination.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPrescriptionsWithoutPagination.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          state.hasFetchAllPrescription = true;
          state.prescriptionWithoutPagination = action.payload;
          console.log('all prescription payload ', action.payload)
        }
      })
      .addCase(fetchAllPrescriptionsWithoutPagination.rejected, (state) => {
        state.status = "failure";
      })
    .addCase(totalProductPages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(totalProductPages.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.totalProductPage = action.payload;
        }
      })
      .addCase(totalProductPages.rejected, (state) => {
        state.status = "failure";
      })
    .addCase(totalPrescriptionPages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(totalPrescriptionPages.fulfilled, (state, action) => {
        state.status = "success";
        console.log("totalPrescriptionPages fulfilled ", action.payload);
        if (state.status === "success" && action.payload) {
          state.totalPrescriptionPage = action.payload;
        }
      })
      .addCase(totalPrescriptionPages.rejected, (state) => {
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
      })
      .addCase(searchedProductBrand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchedProductBrand.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          state.productSearched = action.payload;
        }
      })
      .addCase(searchedProductBrand.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export const selectproductAdmin = (state: RootState) => state.productAdmin;
export const {
  invalidateFetchAllProductCache,
  invalidateFetchAllPrescriptionCache,
  setProductIndexClicked,
  setProductSubTabIndex,
  setProductSubTabRoute,
  resetSearchProduct, 
  setProductCategoryName
} = productAdminSlice.actions;
export default productAdminSlice.reducer;
