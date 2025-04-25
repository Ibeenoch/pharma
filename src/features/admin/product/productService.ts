import { ID } from "node-appwrite";
import { database, storage } from "../../../lib/appwriteConfig";
import { Query } from "appwrite";
import { ProductDataProps } from "../../../types/product/ProductData";
import { UpdateProductCart } from "../../../types/cart/CartData";

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
    let uploadedProductImageFiles: {
      fileId: string;
      name: string;
      mimeType: string;
    }[] = [];
    for (const image of imageFiles) {
      const res = await storage.createFile(
        import.meta.env.VITE_BUCKET_ID, 
        ID.unique(),
        image
      );

      uploadedProductImageFiles.push({
        fileId: res.$id,
        name: res.name,
        mimeType: res.mimeType,
      });
    }

    let productImages: string[] = [];
    for (const fileId of uploadedProductImageFiles) {
      const res = storage.getFileDownload(
        import.meta.env.VITE_BUCKET_ID,
        fileId.fileId
      );

      productImages.push(res);
    }

    console.log("product imageFiles", productImages);

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
      }
    );

    return {
      name: productCreation.name,
      $id: productCreation.$id,
      price: productCreation.price,
      creator: productCreation.creator,
      description: productCreation.description,
      quantity: productCreation.quantity,
      discount: productCreation.discount,
      category: productCreation.category,
      brand: productCreation.brand,
      expirationDate: productCreation.expirationDate,
      productSerialNo: productCreation.productSerialNo,
      additionalInfo: productCreation.additionalInfo,
      imagesUrl: productCreation.imagesUrl,
      isHotDeal: productCreation.isHotDeal,
    } as ProductDataProps;
  } catch (error) {
    throw error;
    console.log(error);
  }
};

export const updateProduct = async (productData: FormData) => {
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
      productId,
    } = data;

    // upload the product images
    const uploadedImagesJsonString = productData.get(
      "uploadedImages"
    ) as string;
    const uploadedImages: string[] = JSON.parse(uploadedImagesJsonString);
    console.log("uploadedImages ", uploadedImages);
    const imageFiles = productData.getAll("imageFiles") as File[];
    let productImages: string[] = [];
    if (imageFiles) {
      let uploadedProductImageFiles: {
        fileId: string;
        name: string;
        mimeType: string;
      }[] = [];
      for (const image of imageFiles) {
        const res = await storage.createFile(
          import.meta.env.VITE_BUCKET_ID,
          ID.unique(),
          image
        );

        uploadedProductImageFiles.push({
          fileId: res.$id,
          name: res.name,
          mimeType: res.mimeType,
        });
      }

      for (const fileId of uploadedProductImageFiles) {
        const res = storage.getFileDownload(
          import.meta.env.VITE_BUCKET_ID,
          fileId.fileId
        );

        productImages.push(res);
      }
    }
    productImages = [...productImages, ...uploadedImages];

    const productUpdate = await database.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID, // product collection id
      productId,
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
      }
    );

    return {
      name: productUpdate.name,
      $id: productUpdate.$id,
      price: productUpdate.price,
      creator: productUpdate.creator,
      description: productUpdate.description,
      quantity: productUpdate.quantity,
      discount: productUpdate.discount,
      category: productUpdate.category,
      brand: productUpdate.brand,
      expirationDate: productUpdate.expirationDate,
      productSerialNo: productUpdate.productSerialNo,
      additionalInfo: productUpdate.additionalInfo,
      imagesUrl: productUpdate.imagesUrl,
      isHotDeal: productUpdate.isHotDeal,
    } as ProductDataProps;
  } catch (error) {
    throw error;
    console.log(error);
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    await database.deleteDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID, // product collection id
      productId
    );
  } catch (error) {
    throw error;
    console.log(error);
  }
};

export const allProduct = async (userId: string) => {
  try {
    let allproduct = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID, // product collection id
      [Query.equal("creator", userId)]
    );

    const allProductList: ProductDataProps[] = allproduct.documents.map(
      (product: any) => ({
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
        $id: product?.$id,
        productSerialNo: product?.productSerialNo,
        createdAt: product?.$createdAt,
      })
    );
    return allProductList;
  } catch (error) {
    throw error;
  }
};

export const updateProductStockQty = async (stockData: UpdateProductCart) => {
  try {
    const { productId, qty } = stockData;
    // Step 1: Get the current product to read its quantity
    const product = await database.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID,
      productId
    );

    const currentQty = product.quantity; // assuming 'quantity' is a number

    const productUpdate = await database.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID, // product collection id
      productId,
      {
        quantity: currentQty > 0 ? currentQty - qty : 0,
      }
    );

    return {
      name: productUpdate.name,
      $id: productUpdate.$id,
      price: productUpdate.price,
      creator: productUpdate.creator,
      description: productUpdate.description,
      quantity: productUpdate.quantity,
      discount: productUpdate.discount,
      category: productUpdate.category,
      brand: productUpdate.brand,
      expirationDate: productUpdate.expirationDate,
      productSerialNo: productUpdate.productSerialNo,
      additionalInfo: productUpdate.additionalInfo,
      imagesUrl: productUpdate.imagesUrl,
      isHotDeal: productUpdate.isHotDeal,
    } as ProductDataProps;
  } catch (error) {
    throw error;
  }
};

export const searchProduct = async (searchTerm: string) => {
  try {
    let allproduct = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID // product collection id
    );
    console.log("allproduct ", allproduct);
    const search = allproduct.documents.filter((doc) => {
      return (
        doc.name.toLowerCase().includes(searchTerm) ||
        doc.description.toLowerCase().includes(searchTerm) ||
        doc.category.toLowerCase().includes(searchTerm) ||
        doc.brand.toLowerCase().includes(searchTerm) ||
        doc.additionalInfo.toLowerCase().includes(searchTerm)
      );
    });

    const productSearched: ProductDataProps[] = search.map((productFound) => ({
      name: productFound.name,
      $id: productFound.$id,
      price: productFound.price,
      creator: productFound.creator,
      description: productFound.description,
      quantity: productFound.quantity,
      discount: productFound.discount,
      category: productFound.category,
      brand: productFound.brand,
      expirationDate: productFound.expirationDate,
      productSerialNo: productFound.productSerialNo,
      additionalInfo: productFound.additionalInfo,
      imagesUrl: productFound.imagesUrl,
      isHotDeal: productFound.isHotDeal,
      createdAt: productFound.$createdAt,
    }));
    console.log("searched word result ", productSearched);

    return productSearched;
  } catch (error) {
    throw error;
  }
};
