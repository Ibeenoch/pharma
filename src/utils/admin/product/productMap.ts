import { ProductDataProps } from "../../../types/product/ProductData";
import { formatDate } from "../../dateFormatter";

export const mapProductToTableData = (productList: ProductDataProps[]) => {
    return productList.map((item, index) => ({
        id: index,
        name: item.name,
        category: item.category,
        brand: item.brand,
        stock: item.quantity,
        qtysold: 1,
        expired: item.expirationDate ? new Date(item.expirationDate) < new Date() ? 'Yes' : 'NO' : 'N/A',
        unitPrice: `₦${item.price.toLocaleString()}`,
        dateAdded: item && item.createdAt && formatDate(item.createdAt),
        actions: `Actions_${item.productId}`, 
        productId: item.productId,
    }))
} 

export const mapProductId = (productList: ProductDataProps[]) => {
    return productList.map((item) => ({
        id: item.productId,
    }))
} 