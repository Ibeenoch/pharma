import { AllOrderResultData } from "../../types/order/OrderType";
import { SalesDataProps } from "../../types/product/ProductData";
import { formatDate, getMonth } from "../dateFormatter";
import { formatWithCommas } from "../formatAmount";

export const mapOrderHistory = (orderList: AllOrderResultData[]) => {
  let mappedOrderHistory = orderList.map((order) => ({
    id: `${order.$id}`,
    qty: order.cart.length,
    paymentMethod: order.transaction.payMethod,
    status: order.transaction.status,
    total: `₦${order.transaction.amount}`,
    customerName: order.shippingDetails.fullname,
    phone: order.shippingDetails.phoneNumber,
    email: order.shippingDetails.email,    
    address: order.shippingDetails.address,
    totalItems: order.cart.map((curr) => curr.quantity),
    totalAmount: order.cart.map((curr) => curr.total),
    orderDate: order.$createdAt,
    image: order.cart.map((c) => c.imagesUrl),
    productCategory: order.cart.map((c) => c.category),
    productname: order.cart.map((c) => c.name),
    userId: order.shippingDetails.userId,
    // totalItemPerProduct: order.cart[0].
  }));
  return mappedOrderHistory;
};


const calTotalAmount = (cart: any[]) => {
  return cart.reduce((_, curr) => {
    let price = curr.price;
    let discount = curr.discount;
    let quantity = curr.quantity;
    const totalAmount =
      price - (discount === 0 ? 1 : (discount / 100) * price) * quantity;
    return `₦${formatWithCommas(totalAmount)}`;
  }, 0);
};

export const mappedAllOrders = (orderList: AllOrderResultData[]) => {
  let mappedOrder = orderList.map((order) => ({
    orderId: `${order.$id.slice(0,7)}`,
    customerName: order.shippingDetails.fullname,
    phone: order.shippingDetails.phoneNumber,
    email: order.shippingDetails.email,
    address: order.shippingDetails.address,
    totalItems: order.cart.length,
    totalAmount: calTotalAmount(order.cart),
    status: order.orderStatus,
    paymentMethod: order.transaction.payMethod,
    orderDate: formatDate(order.$createdAt as string),
    $id: order.$id,
    image: order.cart[0].imagesUrl[0],
    productCategory: order.cart[0].category,
    productname: order.cart[0].name,
  }));
  return mappedOrder;
};

export const mappedSales = (orders: AllOrderResultData[]): SalesDataProps[] => {
  const salesMap = new Map<string, SalesDataProps>();

  for (const order of orders) {
    const month = getMonth(order.$createdAt);

    for (const item of order.cart) {
      const key = `${month}-${item.category}`;

      if (salesMap.has(key)) {
        salesMap.get(key)!.qty += item.quantity;
      } else {
        salesMap.set(key, {
          month,
          category: item.category,
          qty: item.quantity,
        });
      }
    }
  }

  return Array.from(salesMap.values());
};
