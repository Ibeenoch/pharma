import { NavigateFunction } from "react-router-dom";
import { CartProductDataProps, cartProps, ProductDataProps } from "../types/product/ProductData";
import { addToCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks/reduxHooks";

  
export const handleHomeNavToProductDetails = (navigate: NavigateFunction, id: string) => {
    navigate(`/product_details/${id}`);
}

export const navToAllProduct = (navigate: NavigateFunction) => {
    navigate(`/allProduct`);
}

