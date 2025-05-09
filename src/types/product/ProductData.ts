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
  isHotDeal?: number;
  imagesUrl: string[];
  createdAt?: string;
}

export interface SimilarProductProps {
  category?: string;
  brand?: string;
  producTId: string;
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
  isHotDeal?: number;
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

export interface PrescriptionProps {
  $id?: string;
  $updatedAt?: string;
  $createdAt?: string;
  sastifiedClient?: string[];
  productId: string;
  productName: string;
  productImage: string;
  productSummary: string;
  concentration: string;
  dosageForm: string;
  aboutDrug: string;
  ingredient: string[];
  ageRange: string;
  dosage: string;
  frequency: string;
  duration: string;
  whenTakeDosage: string;
  methodOfUsage: string;
}

export interface PrescriptionTableProps {
  sn: number;
  image: string;
  name: string;
  frequency: string;
  methodOfUsage: string;
  concentration: string;
  dosage: string;
  ageRange: string;
  $id: string;
}

export interface UpdatedHotProductProps{
  productId: string;
  isHotDeal: number;
}


export interface SalesDataProps {
  month: string;
  category: string;
  qty: number;
}