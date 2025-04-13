import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartProps, ProductDataProps } from "../../types/product/ProductData";
import { RootState } from "../../redux/store";

interface cartState {
  cart: { item: ProductDataProps; qty: number }[];
  wishlist: { item: ProductDataProps; qty: number }[];
  cartQty: number;
  cartIndex: number;
  wishListIndex: number;
  wishListQty: number;
  showModal: boolean;
  isCart: boolean;
  subTotal: number;
  total: number;
}

const initialState: cartState = {
  cart: [],
  wishlist: [],
  cartQty: 0,
  wishListQty: 0,
  cartIndex: 1,
  wishListIndex: 1,
  showModal: false,
  isCart: true,
  subTotal: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartProps>) => {
      const exists = state.cart.some((i) => {
        i.item.$id === action.payload.item.$id;
      });
      if (!exists) {
        state.cart.push(action.payload);
        state.showModal = true;
        state.isCart = true;
      }
    },
    increaseCartQty: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex(
        (item) => item.item.$id === action.payload
      );
      if (index !== -1) {
        state.cart[index].qty++;
      }
      console.log(
        "increaseCartQty ",
        Array.isArray(state.cart),
        index,
        state.cart[index].qty
      );
    },
    decreaseCartQty: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex(
        (item) => item.item.$id === action.payload
      );
      if (index !== -1) {
        if (state.cart[index].qty > 1) {
          state.cart[index].qty -= 1;
        }
      }
      console.log("decreaseCartQty ", state.cart, index, state.cart[index].qty);
    },
    increaseOrDecreaseCartQty: (
      state,
      action: PayloadAction<{ id: string; val: number }>
    ) => {
      const { id, val } = action.payload;
      const index = state.cart.findIndex((item) => item.item.$id === id);
      console.log({ id, val, index });
      if (index !== -1 && val > 0) {
        console.log("lolook");
        state.cart[index].qty = val;
      }
      console.log("upadteCartQty ", index, state.cart[index].qty);
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
    addTowishlist: (state, action: PayloadAction<cartProps>) => {
      const exists = state.wishlist.some(
        (item) => item.item.$id === action.payload.item.$id
      );
      if (!exists) {
        state.wishlist.push(action.payload);
        state.showModal = true;
        state.isCart = false;
      }
    },
    removeFromwishlist: (state, action: PayloadAction<string>) => {
      const index = state.wishlist.findIndex(
        (c) => c.item.$id === action.payload
      );
      state.wishlist.splice(index, 1);
    },
    increasewishlistQty: (state, action: PayloadAction<string>) => {
      const index = state.wishlist.findIndex(
        (item) => item.item.$id === action.payload
      );
      if (index !== -1) {
        state.wishlist[index].qty += 1;
      }
      console.log(
        "increasewishlistQty ",
        state.wishlist,
        index,
        state.wishlist[index].qty
      );
    },
    decreasewishlistQty: (state, action: PayloadAction<string>) => {
      const index = state.wishlist.findIndex(
        (item) => item.item.$id === action.payload
      );
      if (index !== -1) {
        if (state.wishlist[index].qty > 1) {
          state.wishlist[index].qty -= 1;
        }
      }
      console.log(
        "decreasewishlistQty ",
        state.wishlist,
        index,
        state.wishlist[index].qty
      );
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
    calculateSubTotal: (state) => {
      state.subTotal = state.cart.reduce((acc, curr) => {
        let price = curr.item.price,
          quantity = curr.qty;
        return acc + price * quantity;
      }, 0);
    },
    //     const subTotal = product.reduce((acc, p, i) => {
    //   let q = cartIndex === i ? cartQty : 1;
    //   const price =
    //     p && p.item && p.item.price && p.item.discount
    //       ? p.item.price * Math.abs(1 - p.item.discount)
    //       : p.item.price || 1;
    //   return acc + price * q;
    // }, 0);
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
  increasewishlistQty,
  decreaseCartQty,
  decreasewishlistQty,
  increaseOrDecreaseCartQty,
  calculateSubTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
