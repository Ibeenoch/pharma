import { AllOrderResultData } from "../../types/order/OrderType";
import { formatDate } from "../dateFormatter";
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

// $createdAt
// :
// "2025-04-20T19:10:02.588+00:00"
// $id
// :
// "68054685000d576bcd67"
// $updatedAt
// :
// "2025-04-20T19:10:02.588+00:00"
// cart
// :
// (3) [{…}, {…}, {…}]
// orderStatus
// :
// "Processing"
// transaction
// :
// null
// userId
// :
// "67f691cdf1ccf1511ca6"

// cart
// :
// Array(3)
// 0
// :
// $collectionId
// :
// "6802312b00022b313fed"
// $createdAt
// :
// "2025-04-20T19:10:00.705+00:00"
// $databaseId
// :
// "67f2b71c000e19d94e03"
// $id
// :
// "68054683000827833be5"
// $updatedAt
// :
// "2025-04-20T19:10:02.608+00:00"
// brand
// :
// "Evans Medical Plc"
// cartId
// :
// "6805468300081ec0a9af"
// category
// :
// "Cough and Cold"
// creator
// :
// "67f691cdf1ccf1511ca6"
// description
// :
// "Codewell Cough Suppressant Syrup is a highly effective, codeine-based oral medication specifically formulated to provide relief from dry, irritating, and non-productive coughs. It acts directly on the cough center in the brain to suppress the urge to cough, allowing for uninterrupted rest and faster recovery. The soothing properties of this syrup also help reduce throat irritation and inflammation, which are common side effects of persistent coughing.\n\n**Key Benefits:**\n- Provides fast-acting and long-lasting relief from dry and tickly coughs\n- Helps reduce nighttime coughing to promote restful sleep\n- Eases throat discomfort and irritation\n- Contains codeine phosphate, a powerful cough suppressant\n- Formulated with a palatable cherry-menthol flavor for ease of use\n\n**Active Ingredient:**\n- Codeine Phosphate – 10mg per 5ml\n\n**Dosage Instructions:**\n- Adults and children over 12 years: 5ml to 10ml every 4–6 hours as needed. Do not exceed 4 doses in 24 hours.\n- Not suitable for children under 12 years old.\n- Always consult a healthcare professional before use.\n\n**Caution:**\n- May cause drowsiness; avoid driving or operating heavy machinery after use.\n- Not recommended for use in pregnancy or breastfeeding without medical advice.\n- Avoid combining with alcohol or other central nervous system depressants.\n- For short-term use only unless prescribed by a physician.\n\n**Storage:**\n- Store in a cool, dry place away from direct sunlight.\n- Keep out of reach of children.\n\n**Additional Information:**\n- NAFDAC Number: 04-6554\n- Volume: 100ml per bottle\n- Manufactured by: PharmaWell Pharmaceuticals Ltd.\n- Suitable for: Adults and adolescents (12+)\n- Prescription: Required\n- Flavor: Cherry-Menthol\n- Packaging: Sealed amber bottle with tamper-proof cap\n\n**Warnings:**\n- Misuse of codeine-containing medicines can lead to addiction, overdose, or death.\n- Use only as directed and never share with others.\n\nFor best results, use as part of a complete cough care regimen including rest, hydration, and if necessary, other physician-recommended treatments.\n"
// discount
// :
// 5
// imagesUrl
// :
// (3) ['https://cloud.appwrite.io/v1/storage/buckets/67f57…00a178e4182/download?project=67f2b19c000c1bc0ba2d', 'https://cloud.appwrite.io/v1/storage/buckets/67f57…026bdd9e708/download?project=67f2b19c000c1bc0ba2d', 'https://cloud.appwrite.io/v1/storage/buckets/67f57…002ebc78576/download?project=67f2b19c000c1bc0ba2d']
// name
// :
// "Codewell Cough Syrup edit"
// price
// :
// 3500
// productId
// :
// "67fa22440039cd7f0b7d"
// productSerialNo
// :
// "CW-SYRUP-20250412"
// quantity
// :
// 1
