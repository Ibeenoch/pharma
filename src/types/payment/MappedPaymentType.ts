export interface MappedTransactionProps {
  images: false | string[];
  shippingId?: string; // "SHIP001",
  shippingType?: string; // "Express",
  shippingStatus: string | undefined;
  itemTitle: string;
  itemQty: number;
  amount: number;
  orderDate: string | undefined;
  customerName: string;
  paymentMethod: string;
}
