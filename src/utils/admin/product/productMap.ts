import {
  mappedSearchResultProps,
  PrescriptionProps,
  PrescriptionTableProps,
  ProductDataProps,
} from "../../../types/product/ProductData";
import { formatDate, formatDateWithOrdinal } from "../../dateFormatter";

export const mapProductToTableData = (productList: ProductDataProps[]) => {
  return productList.map((item) => ({
    image: item.imagesUrl[0],
    name: item.name,
    category: item.category,
    brand: item.brand,
    stock: item.quantity,
    expired: item.expirationDate
      ? new Date(item.expirationDate) < new Date()
        ? "Yes"
        : "No"
      : "N/A",
    unitPrice: `₦${item.price.toLocaleString()}`,
    dateAdded: item && item.createdAt && formatDate(item.createdAt),
    actions: `Actions_/admin/product/update/${item.$id}`,
    $id: item.$id,
    imagesUrl: item.imagesUrl,
    price: item.price,
    productSerialNo: item.productSerialNo,
    description: item.description,
    additionalInfo: item.additionalInfo,
    discount: item.discount,
  }));
};

export const mapProductId = (productList: ProductDataProps[]) => {
  return productList.map((item) => ({
    id: item.$id,
  }));
};

export const mappedSearchResult = (result: ProductDataProps[]) => {
  return result.map((item) => ({
    image: item.imagesUrl[0],
    amberText: item.name,
    titleText: item.category,
    descText: item.description,
    timeText: item && item.createdAt && formatDateWithOrdinal(item.createdAt),
    id: item && item.$id && item.$id,
  }));
};

export const mappedPrescription = (prescriptions: PrescriptionProps[]): PrescriptionTableProps[] => {
  return prescriptions.map((item, i) => ({
    sn: i + 1,
    image: item.productImage,
    name: item.productName,
    frequency: item.frequency,
    methodOfUsage: item.methodOfUsage,
    concentration: item.concentration,
    dosage: item.dosage,
    ageRange: item.ageRange,
    $id: item.$id ?? '',
    actions: `Actions_${item.productId}`,
  }));
}
