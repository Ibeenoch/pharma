export interface CartOrderedPropsData {
  productId: string;
  $id: string;
  cartId: string;
  brand: string;
  category: string;
  imagesUrl: string[];
  creator: string;
  description: string;
  discount: number;
  price: number;
  name: string;
  productSerialNo: string;
  quantity: number;
  subtotal: number;
  total: number;
}

export interface UpdateProductCart {
  qty: number;
  productId: string;
}
