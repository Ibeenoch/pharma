import { createSlice } from "@reduxjs/toolkit";

interface cartState {
  status: "idle" | "loading" | "success" | "failure";
}

const initialState: cartState = {
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
