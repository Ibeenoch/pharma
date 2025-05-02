import { AllOrderResultData } from "../../../types/order/OrderType";
import { TransactionProps } from "../../../types/payment/FlutterwavePaymentType";
import { MappedDashboardRecentTransactionProps } from "../../../types/payment/MappedPaymentType";
import { formatDate, formatFullDateTime } from "../../dateFormatter";
import { formatWithCommas } from "../../formatAmount";

export const mappedTransaction = (transactionsList: TransactionProps[], orders: AllOrderResultData[]) => {
  return transactionsList.map((t) => {
let totalQty = orders.find((o) => o.transaction.$id === t.$id)?.cart.forEach((c) => 0 + c.quantity);
    return ({
      image: String(t.imageUrl[0]),
      shippingId: t.shippingId, // "SHIP001",
      shippingType: t.shippingType, // "Express",
      shippingStatus: t.shippingStatus,
      itemTitle: String(t.productName[0]),
      itemQty: String(totalQty === undefined ? 1 : totalQty),
      amount: String(formatWithCommas(t.amount)),
      orderDate: formatFullDateTime(t.createdAt ?? ""),
      customerName: t.customerName,
      paymentMethod: t.payMethod,
      textBgColor:
        t.shippingStatus.toLowerCase() === "pending"
          ? "bg-yellow-500/50"
          : t.shippingStatus.toLowerCase() === "shipped"
            ? "bg-blue-500/50"
            : t.shippingStatus.toLowerCase() === "cancelled"
              ? "bg-red-500/50"
              : "bg-green-500/50",
      textColor:
        t.shippingStatus.toLowerCase() === "pending"
          ? "text-amber-500"
          : t.shippingStatus.toLowerCase() === "shipped"
            ? "text-blue-500"
            : t.shippingStatus.toLowerCase() === "cancelled"
              ? "text-red-500"
              : "text-green-500",
      id: t.$id,
    })
  });
};


export const mappedDashboardRecentTransaction = (transaction: TransactionProps[] ): MappedDashboardRecentTransactionProps[] => {
    return transaction.map((t) => ({
      order_id : t.$id ? t.$id.slice(0, 8) + '...' : '',
      customer_name: t.customerName,
     date: formatDate(t.createdAt ?? ''),
     payment_method: t.payMethod,
     price: (`₦${t.amount}`),
     status: t.status,
   }))
}