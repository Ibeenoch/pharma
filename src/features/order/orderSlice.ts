import { createSlice } from "@reduxjs/toolkit";

interface orderState {
  status: "idle" | "loading" | "success" | "failure";
}

const initialState: orderState = {
  status: "idle",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
