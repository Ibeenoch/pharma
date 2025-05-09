import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; // Import reducer
import adminReducer from "../features/admin/adminSlice";
import orderReducer from "../features/order/orderSlice";
import adminProduceReducer from "../features/admin/product/productSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";
import storage from "redux-persist/lib/storage";
import { createMigrate, persistReducer } from "redux-persist";

//  What’s happening in your code?
// 1. version: 1
// You’re telling Redux Persist:

// “Hey, this version of my state is version 1. If a user's saved state is older than this, run a migration to update it.”

const migrations = {
  7.0: (state: any) => {
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
      order: {
        totalOrderPage: 0,
        hasPreviousShippingDetails: false,
        shippingDetail: {
          userId: "",
          address: "",
          country: "",
          lga: "",
          phoneNumber: "",
          state: "",
          zipcode: "",
        },
        order: {
          $id: "",
          cart: [],
          shippingDetail: {
            userId: "",
            address: "",
            country: "",
            lga: "",
            phoneNumber: "",
            state: "",
            zipcode: "",
          },
          transaction: {
            $id: "",
            status: "",
            transactionId: "",
            amount: 0,
            transactionRef: "",
            createdAt: "",
            payerId: "",
            payMethod: "",
          },
        },
        orders: [
          {
            $id: "",
            cart: [],
            shippingDetail: {
              userId: "",
              address: "",
              country: "",
              lga: "",
              phoneNumber: "",
              state: "",
              zipcode: "",
            },
            transaction: {
              $id: "",
              status: "",
              transactionId: "",
              amount: 0,
              transactionRef: "",
              createdAt: "",
              payerId: "",
              payMethod: "",
            },
          },
        ],
        ordersWithoutPagination: [
          {
            $id: "",
            cart: [],
            shippingDetail: {
              userId: "",
              address: "",
              country: "",
              lga: "",
              phoneNumber: "",
              state: "",
              zipcode: "",
            },
            transaction: {
              $id: "",
              status: "",
              transactionId: "",
              amount: 0,
              transactionRef: "",
              createdAt: "",
              payerId: "",
              payMethod: "",
            },
          },
        ],
        refreshOrder: false,
        refreshAnOrder: false,
        refreshTransaction: false,
        refreshATransaction: false,
        hasShippingDetailsSubmitted: false,
        status: "idle",
        transaction: {
          amount: 0,
          payerId: "",
          status: "",
          transactionId: "",
          transactionRef: "",
          $id: "",
          createdAt: "",
          payMethod: "",
        },
        transactions: [],
      },
      user: {
        status: "idle",
        contacts: [],
        emailSub: [],
        notifications: [],
        totalUnreadnotification: 0,
        totalContactPage: 0,
        totalEmailSubPage: 0,
      },
    };
  },
};

const persistConfig = {
  key: "root",
  storage,
  version: 7.0,
  migrate: createMigrate(migrations, { debug: false }),
  // blackList: ["auth", "checkout"],
};

const reducers = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  product: productReducer,
  productAdmin: adminProduceReducer,
  cart: cartReducer,
  order: orderReducer,
  user: userReducer,
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
