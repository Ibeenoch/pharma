import { UserDataProps } from "../../types/auth/UserData";
import { OrderReturnProps } from "../../types/order/OrderType";
import { formatDate } from "../dateFormatter";
import { formatWithCommas } from "../formatAmount";

export const mapOrderHistory = (orderList: OrderReturnProps[]) => {
  let mappedOrderHistory = orderList.map((order) => ({
    id: `#${order.$id}`,
    qty: order.cart.length,
    paymentMethod: order.transaction.payMethod,
    status: order.transaction.status,
    total: `₦${order.transaction.amount}`,
  }));
  return mappedOrderHistory;
};

const calTotalAmount = (cart: any[]) => {
  return cart.reduce((acc, curr) => {
    let price = curr.price;
    let discount = curr.discount;
    let quantity = curr.quantity;
    const totalAmount =
      price - (discount === 0 ? 1 : (discount / 100) * price) * quantity;
    return `₦${formatWithCommas(totalAmount)}`;
  }, 0);
};

export const mappedAllOrders = (orderList: OrderReturnProps[]) => {
  let mappedOrder = orderList.map((order) => ({
    orderId: `#${order.$id}`,
    customerName: order.shippingDetail.fullname,
    phone: order.shippingDetail.phoneNumber,
    email: order.shippingDetail.email,
    address: order.shippingDetail.address,
    totalItems: order.cart.length,
    totalAmount: calTotalAmount(order.cart),
    status: order.orderStatus,
    paymentMethod: order.transaction.payMethod,
    orderDate: formatDate(order.createdAt as string),
    $id: order.$id,
    image: order.cart[0].imagesUrl[0],
    productCategory: order.cart[0].category,
    productname: order.cart[0].name,
  }));
  return mappedOrder;
};

// orderId: string;
// customerName: string;
// phone: string;
// email: string;
// address: string;
// totalItems: number;
// totalAmount: string;
// status: string;
// paymentMethod: string;
// orderDate: string;
