import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { ProductDataProps } from "../../types/product/ProductData";

interface productState {
  status: "idle" | "loading" | "success" | "failure";
  product: ProductDataProps;
}

const initialState: productState = {
  status: "idle",
  product: {
    name: "",
    price: 0,
    description: "",
    brand: "",
    category: "",
    quantity: 0,
    additionalInfo: "",
    discount: 0,
    expirationDate: "",
    isHotDeal: false,
    productSerialNo: "",
    creator: '',
    imagesUrl: []
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
