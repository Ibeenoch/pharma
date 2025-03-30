import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; // Import reducer
import adminReducer from "../features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
