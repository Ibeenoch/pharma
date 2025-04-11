import { ID } from "node-appwrite";
import { database, storage } from "../../../lib/appwriteConfig";
import { Query } from "appwrite";
import { ProductDataProps } from "../../../types/product/ProductData";

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
    let uploadedProductImageFiles: { fileId: string; name: string; mimeType: string }[] = [];
    for(const image of imageFiles){
      const res =  await storage.createFile(
        import.meta.env.VITE_BUCKET_ID,
        ID.unique(),
        image
      );

      uploadedProductImageFiles.push({
        fileId: res.$id,
        name: res.name,
        mimeType: res.mimeType,
      })
    }
 
    let productImages: string[] = []
    for(const fileId of uploadedProductImageFiles){
      const res = storage.getFileDownload(
        import.meta.env.VITE_BUCKET_ID,
        fileId.fileId,
    );

    productImages.push(res);
    }

    console.log("product imageFiles", productImages, );

    // upload category image
    const categoryImageFile = productData.get("categoryImage") as File;
    const categoryImageUploaded = await storage.createFile(
      import.meta.env.VITE_BUCKET_ID,
      ID.unique(),
      categoryImageFile
    );
// fetch the category image url
    const categoryImage = storage.getFileDownload(
      import.meta.env.VITE_BUCKET_ID,
      categoryImageUploaded.$id,
  );
    console.log("categoryImageUploaded ", categoryImage, typeof categoryImage);


    // upload brand image
    const brandImageFile = productData.get("brandImage") as File;
    const brandImageUploaded = await storage.createFile(
      import.meta.env.VITE_BUCKET_ID,
      ID.unique(),
      brandImageFile
    );
    // fetch the brand image url
    const brandImage = storage.getFileDownload(
      import.meta.env.VITE_BUCKET_ID,
      brandImageUploaded.$id,
  );
    console.log("brandImageFile ", brandImage, typeof brandImage);

    const productCreation = await database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID, // product collection id
      ID.unique(),
      {
        creator,
        name,
        description,
        price: parseInt(price),
        quantity: parseInt(qty),
        discount: parseInt(discount),
        category,
        brand,
        expirationDate: expiration,
        productSerialNo: serialNo,
        additionalInfo: additionalInfo,
        imagesUrl: productImages,
        categoryImage,
        brandImage,
      }
    );

    console.log("product created as ", productCreation);
  } catch (error) {
    throw error
    console.log(error);
  }
};

export const allProduct = async (userId: string) => {
  try {
    let allproduct = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID, // product collection id
      [
        Query.equal( 'creator', userId)
      ]
    );
    console.log('product all ', allproduct)
    const allProductList: ProductDataProps[] = allproduct.documents.map((product: any) => ({
      creator: product?.creator,
      name: product?.name,
      description: product?.description,
      brand: product?.brand,
      category: product?.category,
      imagesUrl: product?.imagesUrl,
      price: product?.price,
      quantity: product?.quantity,
      additionalInfo: product?.additionalInfo,
      discount: product?.discount,
      expirationDate: product?.expirationDate,
      isHotDeal: product?.isHotDeal,
      productId: product?.$id,
      productSerialNo: product?.productSerialNo,
      createdAt: product?.$createdAt,
    }));
    return allProductList;
   
  } catch (error) {
    throw error
  }
}