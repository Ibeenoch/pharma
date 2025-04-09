import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; // Import reducer
import adminReducer from "../features/admin/adminSlice";
import adminProduceReducer from "../features/admin/product/productSlice";
import productReducer from "../features/product/productSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  // blackList: ["auth", "checkout"],
};

const reducers = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  product: productReducer,
  productAdmin: adminProduceReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     admin: adminReducer,
//   },
// });

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
