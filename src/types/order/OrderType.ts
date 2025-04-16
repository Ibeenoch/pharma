export interface ShippingDetailsProps {
  userId: string;
  phoneNumber: string;
  country: string;
  state: string;
  lga: string;
  zipcode: string;
  address: string;
  $id?: string;
}

export type UpdateShippingArgs = {
  shippingId: string;
  shippingDetails: ShippingDetailsProps;
};