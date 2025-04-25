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

export interface CartProductDataProps {
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
  subtotal: number;
  total: number;
}

export interface cartProps {
  item: CartProductDataProps;
  qty: number;
}
export interface WishListProps {
  item: ProductDataProps;
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

export interface mappedSearchResultProps {
  image: string;
  amberText: string;
  titleText: string;
  timeText: string;
  $id: string;
}
