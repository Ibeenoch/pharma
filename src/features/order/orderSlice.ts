import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./orderService";
import { ShippingDetailsProps } from "../../types/order/OrderType";
import { RootState } from "../../redux/store";

interface orderState {
  hasShippingDetailsSubmitted: boolean;
  shippingDetail: ShippingDetailsProps;
  hasPreviousShippingDetails: boolean;
  status: "idle" | "loading" | "success" | "failure";
}

const initialState: orderState = {
  hasPreviousShippingDetails: false,
  shippingDetail: {
    userId: "",
    address: "",
    country: "",
    lga: "",
    phoneNo: "",
    state: "",
    zipcode: "",
  },
  hasShippingDetailsSubmitted: false,
  status: "idle",
};

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

// export const updateShippingDetails = createAsyncThunk(
//   "order/updatedetails",
//   async ({shippingId: string, shippingDetails: ShippingDetailsProps}, { rejectWithValue }) => {
//     try {
//       return await api.updateShippingDetails(shippingDetails);
//     } catch (error: any) {
//       return rejectWithValue(
//         error.message || "failed to post shipping details"
//       );
//     }
//   }
// );

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(postShippingDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postShippingDetails.fulfilled, (state, action) => {
        state.status = "success";
        state.hasShippingDetailsSubmitted = action.payload;
      })
      .addCase(postShippingDetails.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export const selectOrder = (state: RootState) => state.order;
export const {} = orderSlice.actions;
export default orderSlice.reducer;
