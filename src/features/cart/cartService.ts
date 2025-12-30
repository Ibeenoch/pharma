import { ID, Query } from "appwrite";
import { database } from "../../lib/appwriteConfig";
import {
  CartProductDataProps,
  cartProps,
} from "../../types/product/ProductData";
import { CartOrderedPropsData } from "../../types/cart/CartData";

const toInt = (value: string | number) => {
  const num =
    typeof value === "string" ? Number(value.replace(/[^0-9.-]+/g, "")) : value;

  if (Number.isNaN(num)) {
    throw new Error("Invalid number value");
  }

  return Math.floor(num);
};

export const postCartOrdered = async (cartData: cartProps[]) => {
  try {
    const cartId = ID.unique();

    // Properly wait for each createDocument call
    for (const cart of cartData) {
      const item: CartProductDataProps = cart.item;
      const qty = cart.qty;

      await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_CART_COLLECTION_ID,
        ID.unique(),
        {
          productId: item.$id,
          cartId,
          brand: item.brand,
          category: item.category,
          imagesUrl: item.imagesUrl,
          creator: item.creator,
          description: item.description,
          discount: item.discount,
          price: item.price,
          name: item.name,
          productSerialNo: item.productSerialNo,
          quantity: qty,
          subtotal: toInt(item.subtotal),
          total: toInt(item.total),
        }
      );
    }

    // Now fetch all carts for this cartId
    const allCartsForTheOrder = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_CART_COLLECTION_ID,
      [Query.equal("cartId", cartId)]
    );
    const carts = allCartsForTheOrder.documents.map((cart) => {
      return {
        $id: cart.$id,
        cartId,
        brand: cart.brand,
        category: cart.category,
        description: cart.description,
        discount: cart.discount,
        imagesUrl: cart.imagesUrl,
        creator: cart.creator,
        productId: cart.productId,
        productSerialNo: cart.productSerialNo,
        quantity: cart.quantity,
        price: cart.price,
        name: cart.name,
        subtotal: cart.subtotal,
        total: cart.total,
      } as CartOrderedPropsData;
    });

    return carts;
  } catch (error) {
    throw error;
  }
};

export const getCartOrdered = async (cartId: string) => {
  try {
    const allCartsForTheOrder = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_CART_COLLECTION_ID, // cart id
      [Query.equal("cartId", cartId)]
    );

    const allCarts = allCartsForTheOrder.documents;

    const carts = allCarts.map((cart) => {
      return {
        $id: cart.$id,
        additionalInfo: cart.additionalInfo,
        cartId,
        brand: cart.brand,
        category: cart.category,
        description: cart.description,
        discount: cart.discount,
        imagesUrl: cart.imagesUrl,
        creator: cart.creator,
        productId: cart.productId,
        productSerialNo: cart.productSerialNo,
        quantity: cart.quantity,
        price: cart.price,
        name: cart.name,
        subtotal: cart.subtotal,
        total: cart.total,
      } as CartOrderedPropsData;
    });

    return carts;
  } catch (error) {
    throw error;
  }
};
