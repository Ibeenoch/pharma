import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CartProductDataProps,
  cartProps,
  ProductDataProps,
  WishListProps,
} from "../../types/product/ProductData";
import { RootState } from "../../redux/store";
import { CartOrderedPropsData } from "../../types/cart/CartData";
import * as api from "./cartService";

interface cartState {
  status: "idle" | "loading" | "success" | "failure";
  cart: { item: CartProductDataProps; qty: number }[];
  wishlist: ProductDataProps[];
  cartQty: number;
  cartIndex: number;
  wishListIndex: number;
  wishListQty: number;
  showModal: boolean;
  toastKey: number;
  toastMessage: string;
  isCart: boolean;
  subTotal: number;
  total: number;
  hasItemBeenAddedToCart: boolean;
  hasItemBeenAddedToWishlist: boolean;
  postedCart: CartOrderedPropsData[];
}

const initialState: cartState = {
  status: "idle",
  cart: [],
  wishlist: [],
  cartQty: 0,
  wishListQty: 0,
  toastKey: 0,
  toastMessage: "",
  cartIndex: 1,
  wishListIndex: 1,
  showModal: false,
  isCart: true,
  subTotal: 0,
  total: 0,
  hasItemBeenAddedToCart: false,
  hasItemBeenAddedToWishlist: false,
  postedCart: [],
};

export const postACart = createAsyncThunk(
  "cart/post",
  async (cart: cartProps[], { rejectWithValue }) => {
    try {
      return await api.postCartOrdered(cart);
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to post cart");
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/get",
  async (cartId: string, { rejectWithValue }) => {
    try {
      return await api.getCartOrdered(cartId);
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to get cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartProps>) => {
      const exists = state.cart.findIndex((i) => {
        return i.item.$id === action.payload.item.$id;
      });
      // add it to cart if it doesn't exist
      if (exists === -1) {
        state.showModal = true;
        state.isCart = true;
        state.cart.push(action.payload);
      }
    },
    increaseCartQty: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex(
        (item) => item.item.$id === action.payload
      );
      if (index !== -1) {
        // if the product stock is less than zero don't increase the quantity the customer wants
        state.cart[index].item.quantity <= 1
          ? (state.cart[index].qty = 1)
          : state.cart[index].qty++;
        // calculate and update the subtotal of each cart
        let price = state.cart[index].item.price;
        let discount = state.cart[index].item.discount ?? 0;
        let quantity = state.cart[index].qty;
        state.cart[index].item.subtotal =
          (price - (discount / 100) * price) * quantity;
      }
    },
    decreaseCartQty: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex(
        (item) => item.item.$id === action.payload
      );
      if (index !== -1) {
        if (state.cart[index].qty > 1) {
          state.cart[index].qty -= 1;
          // calculate and update the subtotal of each cart
          state.cart[index].item.subtotal =
            state.cart[index].item.price * state.cart[index].qty;
          // calculate and update the subtotal of each cart
          let price = state.cart[index].item.price;
          let discount = state.cart[index].item.discount ?? 0;
          let quantity = state.cart[index].qty;
          state.cart[index].item.subtotal =
            (price - (discount / 100) * price) * quantity;
        }
      }
    },
    increaseOrDecreaseCartQty: (
      state,
      action: PayloadAction<{ id: string; val: number }>
    ) => {
      const { id, val } = action.payload;
      const index = state.cart.findIndex((item) => item.item.$id === id);
      if (index !== -1 && val > 0) {
        state.cart[index].qty = val;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex((c) => c.item.$id === action.payload);
      state.cart.splice(index, 1);
    },
    removeAllItemsInCart: (state) => {
      state.cart = [];
    },
    updateCartQty: (state, action: PayloadAction<number>) => {
      state.cartQty = action.payload;
    },
    updateCartIndex: (state, action: PayloadAction<number>) => {
      state.cartIndex = action.payload;
    },
    addTowishlist: (state, action: PayloadAction<WishListProps>) => {
      const exists = state.wishlist.findIndex((i) => {
        return i.$id === action.payload.item.$id;
      });

      if (exists === -1) {
        state.showModal = true;
        state.isCart = false;
        state.wishlist.push(action.payload.item);
      }
    },
    removeFromwishlist: (state, action: PayloadAction<string>) => {
      const index = state.wishlist.findIndex((c) => c.$id === action.payload);
      state.wishlist.splice(index, 1);
    },
    removeAllItemsInwishlist: (state) => {
      state.wishlist = [];
    },
    updateWishListQty: (state, action: PayloadAction<number>) => {
      state.wishListQty = action.payload;
    },
    updateWishListIndex: (state, action: PayloadAction<number>) => {
      state.wishListIndex = action.payload;
    },
    updateShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    updateToastKeyAndMsg: (state, action: PayloadAction<string>) => {
      state.toastMessage = action.payload;
      state.toastKey += 1;
    },
    calculateSubTotal: (state) => {
      state.subTotal = state.cart.reduce((acc, curr) => {
        let price = curr.item.price;
        let discount = curr.item.discount ?? 0,
          quantity = curr.qty;
        return acc + (price - (discount / 100) * price) * quantity;
      }, 0);
    },
    calculateTotal: (state) => {
      let total = 0;
      state.cart.forEach((s) => {
        total += s.item.subtotal;
      });
      state.total = total + 1500;
    },
    checkIfItemHasBeenAddedToCheck: (state, action: PayloadAction<string>) => {
      const exists = state.cart.findIndex((i) => {
        return i.item.$id === action.payload;
      });

      if (exists !== -1) state.hasItemBeenAddedToCart = true;
    },
    checkIfItemHasBeenAddedToWishlist: (
      state,
      action: PayloadAction<string>
    ) => {
      const exists = state.wishlist.findIndex((i) => {
        return i.$id === action.payload;
      });
      if (exists !== -1) state.hasItemBeenAddedToWishlist = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postACart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postACart.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          state.postedCart = action.payload;
        }
      })
      .addCase(postACart.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload !== undefined) {
          state.postedCart = action.payload;
        }
      })
      .addCase(getCart.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export const selectCart = (state: RootState) => state.cart;
export const {
  addToCart,
  removeAllItemsInCart,
  removeFromCart,
  addTowishlist,
  removeAllItemsInwishlist,
  removeFromwishlist,
  updateCartQty,
  updateWishListQty,
  updateCartIndex,
  updateWishListIndex,
  updateShowModal,
  increaseCartQty,
  decreaseCartQty,
  increaseOrDecreaseCartQty,
  calculateSubTotal,
  calculateTotal,
  checkIfItemHasBeenAddedToCheck,
  checkIfItemHasBeenAddedToWishlist,
  updateToastKeyAndMsg,
} = cartSlice.actions;
export default cartSlice.reducer;
