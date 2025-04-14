import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; // Import reducer
import adminReducer from "../features/admin/adminSlice";
import adminProduceReducer from "../features/admin/product/productSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import storage from "redux-persist/lib/storage";
import { createMigrate, persistReducer } from "redux-persist";

//  What’s happening in your code?
// 1. version: 1
// You’re telling Redux Persist:

// “Hey, this version of my state is version 1. If a user's saved state is older than this, run a migration to update it.”

const migrations = {
  6.1: (state: any) => {
    return {
      ...state,
      productAdmin: {
        ...state.productAdmin,
        hasFetchAllProduct: false,
        status: "idle",
        productAdmin: [],
        productIndexClicked: "",
      },
      cart: {
        cart: [{ item: {}, qty: 1 }],
        wishlist: [{ item: {}, qty: 1 }],
        cartQty: 0,
        cartIndex: 0,
        wishListQty: 0,
        wishListIndex: 0,
        subTotal: 0,
        total: 0,
        hasItemBeenAddedToCart: false,
        hasItemBeenAddedToWishlist: false,
      },
    };
  },
};

const persistConfig = {
  key: "root",
  storage,
  version: 6.1,
  migrate: createMigrate(migrations, { debug: false }),
  // blackList: ["auth", "checkout"],
};

const reducers = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  product: productReducer,
  productAdmin: adminProduceReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
