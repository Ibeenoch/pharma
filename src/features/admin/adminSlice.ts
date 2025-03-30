import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface adminState {
  status: "idle" | "loading" | "success" | "failure";
  sideBarIndex: number;
  adminUsertabIndex: number;
  adminProducttabIndex: number;
}

const initialState: adminState = {
  status: "idle",
  sideBarIndex: 0,
  adminUsertabIndex: 0,
  adminProducttabIndex: 0,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSideBarIndex: (state, action: PayloadAction<number>) => {
      state.sideBarIndex = action.payload;
    },
    setAdminUserTabIndex: (state, action: PayloadAction<number>) => {
      state.adminUsertabIndex = action.payload;
    },
    setAdminProductTabIndex: (state, action: PayloadAction<number>) => {
      state.adminProducttabIndex = action.payload;
    },
  },
});

export const selectAdmin = (state: RootState) => state.admin;
export const {
  setSideBarIndex,
  setAdminUserTabIndex,
  setAdminProductTabIndex,
} = adminSlice.actions;
export default adminSlice.reducer;
