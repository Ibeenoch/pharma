import { createSlice,  } from "@reduxjs/toolkit";

interface authState {
  status: 'idle' | 'loading' | 'success' | 'failure'
}

const initialState: authState = { 
    status: 'idle'
 };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
   
  },
});

export const { } = authSlice.actions;
export default authSlice.reducer;
