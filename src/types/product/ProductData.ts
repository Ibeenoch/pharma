export interface productDataProps {
  creator: string;
  name: string;
  description: string;
  price: number;
  qty: number;
  discount?: number;
  category: string;
  brand: string;
  expiration?: string;
  serialNo?: string;
  additionalInfo?: string;
  isHotDeal?: boolean;
  imagesUrl: string[];
}
