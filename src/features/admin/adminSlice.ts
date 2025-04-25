import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface adminState {
  status: "idle" | "loading" | "success" | "failure";
  sideBarIndex: number;
  adminUsertabIndex: number;
  adminProducttabIndex: number;
  adminOrdertabIndex: number;
  adminTransactiontabIndex: number;
  shouldMinimizeSideBar: boolean;
  shouldShowSubTitle: boolean;
  titleIndex: number;
}

const initialState: adminState = {
  status: "idle",
  sideBarIndex: 0,
  adminUsertabIndex: 0,
  adminProducttabIndex: 0,
  adminOrdertabIndex: 0,
  adminTransactiontabIndex: 0,
  shouldMinimizeSideBar: false,
  shouldShowSubTitle: false,
  titleIndex: 0,
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
    setAdminOrderTabIndex: (state, action: PayloadAction<number>) => {
      state.adminOrdertabIndex = action.payload;
    },
    setAdminTransactionTabIndex: (state, action: PayloadAction<number>) => {
      state.adminTransactiontabIndex = action.payload;
    },
    setShouldAdminSideBarMinimize: (state, action: PayloadAction<boolean>) => {
      state.shouldMinimizeSideBar = action.payload;
    },
    setShouldShowSubTitle: (state, action: PayloadAction<boolean>) => {
      state.shouldShowSubTitle = action.payload;
    },
    setTitleIndex: (state, action: PayloadAction<number>) => {
      state.titleIndex = action.payload;
    },
  },
});

export const selectAdmin = (state: RootState) => state.admin;
export const {
  setSideBarIndex,
  setAdminUserTabIndex,
  setAdminProductTabIndex,
  setAdminOrderTabIndex,
  setAdminTransactionTabIndex,
  setShouldAdminSideBarMinimize,
  setShouldShowSubTitle,
  setTitleIndex,
} = adminSlice.actions;
export default adminSlice.reducer;
