import { CartOrderedPropsData } from "../cart/CartData";
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

export interface OrderReturnProps {
  cart: CartOrderedPropsData[];
  transaction: TransactionProps;
  shippingDetail: ShippingDetailsProps;
  $id?: string;
  orderStatus?: string;
  createdAt?: string;
  lastUpdated?: string;
  userId: string;
}

export interface OrderProps {
  cart: string[];
  transaction: string;
  shippingDetail: ShippingDetailsProps;
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
}

interface orderShippingDetails {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  address: string;
  country: string;
  lga: string;
  phoneNumber: string;
  state: string;
  userId: string;
  zipcode: string;
}

interface orderTransactionDetails {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  amount: 11436;
  payMethod: string;
  payerId: string;
  status: string;
  transactionId: string;
  transactionRef: string;
}

interface AllOrderResultData {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  cart: orderCartProp[];
  shippingDetail: orderShippingDetails;
  transaction: orderTransactionDetails;
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
