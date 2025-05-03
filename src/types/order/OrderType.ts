import { TransactionProps } from "../payment/FlutterwavePaymentType";

export interface ShippingDetailsProps {
  userId: string;
  phoneNumber: string;
  country: string;
  state: string;
  lga: string;
  zipcode: string;
  address: string;
  $id?: string;
  fullname: string;
  email: string;
}

export type UpdateShippingArgs = {
  shippingId: string;
  shippingDetails: ShippingDetailsProps;
};

// export interface OrderReturnProps {
//   cart: orderCartProp[];
//   transaction: orderTransactionDetails;
//   shippingDetail: orderShippingDetails;
//   $id?: string;
//   orderStatus?: string;
//   createdAt?: string;
//   lastUpdated?: string;
//   userId: string;
// }

// export interface OrderReturnProps {
//   cart: CartOrderedPropsData[];
//   transaction: TransactionProps;
//   shippingDetail: ShippingDetailsProps;
//   $id?: string;
//   orderStatus?: string;
//   createdAt?: string;
//   lastUpdated?: string;
//   userId: string;
// }

export interface OrderProps {
  cart: string[];
  transaction: TransactionProps;
  shippingDetails: ShippingDetailsProps;
  userId: string;
}

export interface OrderStatusProps {
  userId: string;
  orderId: string;
  status: string;
}

export interface OrderArgs {
  userId: string;
  orderId: string;
}

export interface OrderPaginatedArgs {
  userId: string;
  page: number;
}

export interface OrderPaginatedFilteredArgs {
  userId: string;
  page: number;
  start: string;
  end: string;
}

interface orderCartProp {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
  brand: string;
  cartId: string;
  category: string;
  creator: string;
  description: string;
  discount: number;
  imagesUrl: string[];
  name: string;
  productId: string;
  productSerialNo: string;
  quantity: number;
  price: number;
  total: number;
  subtotal: number;
}

export interface orderShippingDetails {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
  address: string;
  country: string;
  lga: string;
  phoneNumber: string;
  state: string;
  userId: string;
  zipcode: string;
  fullname: string;
  email: string;
}

interface orderTransactionDetails {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  amount: number;
  payMethod: string;
  payerId: string;
  status: string;
  transactionId: string;
  transactionRef: string;
  shippingId: string; // "SHIP001",
  shippingType: string; // "Express",
  shippingStatus: string;
}

export interface AllOrderResultData {
  // use this for order return
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  orderStatus: string;
  userId: string;
  cart: orderCartProp[];
  shippingDetails: orderShippingDetails;
  transaction: orderTransactionDetails;
}

export interface AllOrderUserResultData {
  id: string;
  qty: number;
  paymentMethod: string;
  status: string;
  total: string;
  customerName: string;
  phone: string;
  email: string;    
  address: string;
  totalItems: number[];
  totalAmount: number[];
  orderDate: string;
  image: string[][];
  productCategory: string[];
  productname: string[];
}

export interface mappedAllOrdersProps {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  totalItems: number;
  totalAmount: any;
  status: string | undefined;
  paymentMethod: string;
  orderDate: string;
  $id?: string;
  image?: string;
  productCategory?: string;
  productname?: string;
}

export interface ShippingServiceProps {
  shippingType: string;
  shippingStatus: string;
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
}
export interface ShippingServiceUpdateProps {
  $id: string;
  userId: string;
  shippingStatus: string;
}
