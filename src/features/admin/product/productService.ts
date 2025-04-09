import { ID } from "node-appwrite";
import { productDataProps } from "../../../types/product/ProductData";
import { database, storage } from "../../../lib/appwriteConfig";

export const createProduct = async (productData: FormData) => {
  try {
    const data: Record<string, string> = {};
    productData.forEach((val, key) => {
      data[key] = val.toString();
    });
    const {
      creator,
      name,
      description,
      price,
      qty,
      discount,
      category,
      brand,
      expiration,
      serialNo,
      additionalInfo,
    } = data;

    // upload the product images
    const imageFiles = productData.getAll("imageFiles") as File[];
    let uploadedImageFiles: any[] = [];
    imageFiles.forEach(async (image) => {
      const imageUploaded = await storage.createFile(
        import.meta.env.VITE_BUCKET_ID,
        ID.unique(),
        image
      );
      uploadedImageFiles.push(imageUploaded);
    });

    console.log("product imageFiles", imageFiles);

    // upload category image
    const categoryImageFile = productData.get("categoryImage") as File;
    const categoryImageUploaded = await storage.createFile(
      import.meta.env.VITE_BUCKET_ID,
      ID.unique(),
      categoryImageFile
    );
    console.log("categoryImageUploaded ", categoryImageUploaded);

    // upload brand image
    const brandImageFile = productData.get("brandImage") as File;
    const brandImageUploaded = await storage.createFile(
      import.meta.env.VITE_BUCKET_ID,
      ID.unique(),
      brandImageFile
    );
    console.log("brandImageFile ", brandImageFile);

    const productCreation = await database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID, // product collection id
      ID.unique(),
      {
        creator,
        name,
        description,
        price,
        qty,
        discount,
        category,
        brand,
        expiration,
        serialNo,
        additionalInfo,
        imagesUrl: uploadedImageFiles,
        categoryimagesUrl: categoryImageUploaded,
        brandimagesUrl: brandImageUploaded,
      }
    );

    console.log("product created as ", productCreation);
  } catch (error) {
    console.log(error);
  }
};
