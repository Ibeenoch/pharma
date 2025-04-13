export interface ProductDataProps {
  $id?: string;
  creator: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  discount?: number;
  category: string;
  brand: string;
  expirationDate?: string;
  productSerialNo?: string;
  additionalInfo?: string;
  isHotDeal?: boolean;
  imagesUrl: string[];
  createdAt?: string;
}

export interface cartProps {
  item: ProductDataProps;
  qty: number;
}

export interface mappedProductProps {
  id: string;
  $id: string;
  name: string;
  category: string;
  brand: string;
  stock: number;
  qtysold: number;
  expired: string;
  unitPrice: string;
  dateAdded: string;
  imagesUrl: string[];
  description: string;
  discount?: number;
  price: number;
  productSerialNo: string;
  additionalInfo: string;
}
