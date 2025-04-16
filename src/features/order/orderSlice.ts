import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./orderService";
import { ShippingDetailsProps, UpdateShippingArgs } from "../../types/order/OrderType";
import { RootState } from "../../redux/store";

interface orderState {
  hasShippingDetailsSubmitted: boolean;
  shippingDetail: ShippingDetailsProps[];
  hasPreviousShippingDetails: boolean;
  status: "idle" | "loading" | "success" | "failure";
}

const initialState: orderState = {
  hasPreviousShippingDetails: false,
  shippingDetail: [{
    userId: "",
    address: "",
    country: "",
    lga: "",
    phoneNumber: "",
    state: "",
    zipcode: "",
  }],
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
      return rejectWithValue(
        error.message || "failed to get shipping details"
      );
    }
  }
);

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
      })
      .addCase(updateShippingDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateShippingDetails.fulfilled, (state, action) => {
        state.status = "success";
        if(state.status === 'success' && action.payload !== undefined){
          state.shippingDetail = [action.payload];
        }
        // set hasShippingDetailsSubmitted to false to get the updated shipping address
        state.hasShippingDetailsSubmitted = false;
      })
      .addCase(updateShippingDetails.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getShippingDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getShippingDetails.fulfilled, (state, action) => {
        state.status = "success";
        if(state.status === 'success' && action.payload !== undefined){
          state.shippingDetail = action.payload;
          state.hasPreviousShippingDetails = true;
        }
      })
      .addCase(getShippingDetails.rejected, (state) => {
        state.status = "failure";

      })
      ;
  },
});

export const selectOrder = (state: RootState) => state.order;
export const {} = orderSlice.actions;
export default orderSlice.reducer;
