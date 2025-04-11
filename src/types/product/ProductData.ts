export interface ProductDataProps {
  productId?: string;
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



// owner: 
// categoryImage,
// brandImage,