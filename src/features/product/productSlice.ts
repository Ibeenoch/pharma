import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { productDataProps } from "../../types/product/ProductData";

interface productState {
  status: "idle" | "loading" | "success" | "failure";
  product: productDataProps;
}

const initialState: productState = {
  status: "idle",
  product: {
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
    productId: "",
    serialNo: "",
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export const selectproduct = (state: RootState) => state.product;
export const {} = productSlice.actions;
export default productSlice.reducer;
