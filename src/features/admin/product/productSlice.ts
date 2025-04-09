import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";
import { productDataProps } from "../../../types/product/ProductData";

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
    creator: '',
    imagesUrl: []
  },
};

const productAdminSlice = createSlice({
  name: "productAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export const selectproductAdmin = (state: RootState) => state.productAdmin;
export const {} = productAdminSlice.actions;
export default productAdminSlice.reducer;
