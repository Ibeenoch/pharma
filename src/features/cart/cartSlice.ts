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
  hasItemBeenAddedToCart: boolean;
  hasItemBeenAddedToWishlist: boolean;
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
  hasItemBeenAddedToCart: false,
  hasItemBeenAddedToWishlist: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartProps>) => {
      const exists = state.cart.findIndex((i) => {
      return  i.item.$id === action.payload.item.$id;
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
        state.cart[index].qty++;
      }
     
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
    addTowishlist: (state, action: PayloadAction<cartProps>) => {
      const exists = state.wishlist.findIndex((i) => {
        return  i.item.$id === action.payload.item.$id;
        });

      if (exists === -1) {
        state.showModal = true;
        state.isCart = false;
        state.wishlist.push(action.payload);
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
        let price = curr.item.price 
        let discount = curr.item.discount ?? 1,
          quantity = curr.qty;
        return acc + (price - ((discount / 100) * price) ) * quantity;
      }, 0);
    },
    calculateTotal: (state, action: PayloadAction<number>) => {
      state.total  = state.subTotal + action.payload;
    },
    checkIfItemHasBeenAddedToCheck: (state, action: PayloadAction<string>) => {
      const exists = state.cart.findIndex((i) => {
        return  i.item.$id === action.payload;
        });
        console.log('exists in cart', exists);
        if(exists !== -1)state.hasItemBeenAddedToCart = true;
    },
    checkIfItemHasBeenAddedToWishlist: (state, action: PayloadAction<string>) => {
      const exists = state.wishlist.findIndex((i) => {
        return  i.item.$id === action.payload;
        });
        console.log('exists in wishlist', exists);
        if(exists !== -1)state.hasItemBeenAddedToWishlist = true;
    },
  
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
  calculateTotal,
  checkIfItemHasBeenAddedToCheck,
  checkIfItemHasBeenAddedToWishlist
} = cartSlice.actions;
export default cartSlice.reducer;
