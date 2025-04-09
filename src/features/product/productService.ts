import { Account } from "appwrite";
import { productDataProps } from "../../types/product/ProductData";
import { Client, Databases, Storage, ID } from "node-appwrite";
import client, { account, database } from "../../lib/appwriteConfig";

const createProduct = async (productData: productDataProps) => {
  try {
    // get the user id;
    const owner = await account.get();
    const userId = owner.$id;

    if(userId === null || userId === undefined) return;

    // upload the product images
    
    const productCreation = await database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID, // product collection id
      ID.unique(),
      {
        creator: userId,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        qty: productData.qty,
        discount: productData.discount || 1,
        category: productData.category,
        brand: productData.brand,
        expiration: productData.expiration || '',
        serialNo: productData.serialNo || '',
        additionalInfo: productData.additionalInfo || '',
        isHotDeal: false,
        imagesUrl: []
        
      }
    )
  } catch (error) {
    console.log(error);
  }
};
