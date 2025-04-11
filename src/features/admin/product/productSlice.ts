import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";
import { ProductDataProps } from "../../../types/product/ProductData";
import * as api from "./productService";

interface productAdminState {
  status: "idle" | "loading" | "success" | "failure";
  productAdmin: ProductDataProps[];
  hasFetchAllProduct: boolean;
  productIndexClicked: string;
}

const initialState: productAdminState = {
  status: "idle",
  productAdmin: [],
  hasFetchAllProduct: false,
  productIndexClicked: "",
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

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (productData: FormData, { rejectWithValue }) => {
    try {
      return await api.updateProduct(productData);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.status = "success";
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
          // state.productAdmin.find
        }
      })
      .addCase(updateProduct.rejected, (state) => {
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
export const { invalidateFetchAllProductCache, setProductIndexClicked } =
  productAdminSlice.actions;
export default productAdminSlice.reducer;
