export interface FlutterWaveDataProps {
  amount: number; //
  charge_response_code: string;
  charge_response_message: string;
  charged_amount: 16443; //
  created_at: string;
  currency: string;
  customer: {
    email: string;
    name: string;
    phone_number: string;
  };
  flw_ref: string;
  redirectstatus?: string | undefined;
  status: string; //
  transaction_id: number; //
  tx_ref: string; //
}

export interface PayStackProps {
  message: string;
  redirecturl: string;
  reference: string;
  status: string; //
  trans: string;
  transaction: string; //
  trxref: string; //
}

export interface TransactionProps {
  $id?: string;
  status: string;
  transactionId: string;
  amount: number;
  transactionRef: string;
  createdAt?: string;
  payerId: string;
  payMethod: string;
}
