import { createAsyncThunk, createSlice,  } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";
import { productDataProps } from "../../../types/product/ProductData";
import * as api from "./productService";

interface productAdminState {
  status: "idle" | "loading" | "success" | "failure";
  productAdmin: productDataProps;
}

const initialState: productAdminState = {
  status: "idle",
  productAdmin: {
    name: "",
    price: 0,
    description: "",
    brand: "",
    category: "",
    qty: 0,
    additionalInfo: "",
    discount: 0,
    expiration: "",
    isHotDeal: false,
    serialNo: "",
    creator: "",
    imagesUrl: [],
  },
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

const productAdminSlice = createSlice({
  name: "productAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, ) => {
        state.status = "success";
      })
      .addCase(createProduct.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export const selectproductAdmin = (state: RootState) => state.productAdmin;
export const {} = productAdminSlice.actions;
export default productAdminSlice.reducer;
