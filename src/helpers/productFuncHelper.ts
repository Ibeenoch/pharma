import { NavigateFunction } from "react-router-dom";

export const handleHomeNavToProductDetails = (navigate: NavigateFunction, id: string) => {
    navigate(`/product_details/${id}`);
}

export const navToAllProduct = (navigate: NavigateFunction) => {
    navigate(`/allProduct`);
}