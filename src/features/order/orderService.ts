import { ID, Query } from "appwrite";
import { database } from "../../lib/appwriteConfig";
import {
  OrderArgs,
  OrderPaginatedArgs,
  OrderProps,
  OrderReturnProps,
  OrderStatusProps,
  ShippingDetailsProps,
  UpdateShippingArgs,
} from "../../types/order/OrderType";
import { TransactionProps } from "../../types/payment/FlutterwavePaymentType";
import { ITEMS_PER_PAGE } from "../../constants/pagianation";

// service order
export const addShippingDetails = async (
  addShippingDetails: ShippingDetailsProps
) => {
  try {
    // find if a user Id already exist
    const checkIfShippingAdressExistArr = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_SHIPPING_COLLECTION_ID, // collection id
      [Query.equal("userId", addShippingDetails.userId)]
    );
    const checkIfShippingAdressExist = checkIfShippingAdressExistArr.documents;
    if (checkIfShippingAdressExist.length >= 1) {
      // return the shipping Address
      return {
        userId: checkIfShippingAdressExist[0].userId,
        phoneNumber: checkIfShippingAdressExist[0].phoneNumber,
        country: checkIfShippingAdressExist[0].country,
        state: checkIfShippingAdressExist[0].state,
        lga: checkIfShippingAdressExist[0].lga,
        zipcode: checkIfShippingAdressExist[0].zipcode,
        address: checkIfShippingAdressExist[0].address,
        $id: checkIfShippingAdressExist[0].$id,
        fullname: checkIfShippingAdressExist[0].fullname,
        email: checkIfShippingAdressExist[0].email,
      } as ShippingDetailsProps;
    } else {
      const shippingAddressCreated = await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
        import.meta.env.VITE_APPWRITE_SHIPPING_COLLECTION_ID, // collection id
        ID.unique(),
        {
          userId: addShippingDetails.userId,
          phoneNumber: addShippingDetails.phoneNumber,
          country: addShippingDetails.country,
          state: addShippingDetails.state,
          lga: addShippingDetails.lga,
          zipcode: addShippingDetails.zipcode,
          address: addShippingDetails.address,
          fullname: addShippingDetails.fullname,
          email: addShippingDetails.email,
        }
      );

      return {
        userId: shippingAddressCreated.userId,
        phoneNumber: shippingAddressCreated.phoneNumber,
        country: shippingAddressCreated.country,
        state: shippingAddressCreated.state,
        lga: shippingAddressCreated.lga,
        zipcode: shippingAddressCreated.zipcode,
        address: shippingAddressCreated.address,
        $id: shippingAddressCreated.$id,
        fullname: shippingAddressCreated.fullname,
        email: shippingAddressCreated.email,
      } as ShippingDetailsProps;
    }
  } catch (error) {
    throw error;
  }
};

export const updateShippingDetails = async (
  shippingDetails: UpdateShippingArgs
) => {
  const updatedShippingDetails = shippingDetails.shippingDetails,
    shippingDetailsId = shippingDetails.shippingId;
  try {
    const shippingAddressUpdated = await database.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_SHIPPING_COLLECTION_ID, // collection id
      shippingDetailsId,
      {
        userId: updatedShippingDetails.userId,
        phoneNumber: updatedShippingDetails.phoneNumber,
        country: updatedShippingDetails.country,
        state: updatedShippingDetails.state,
        lga: updatedShippingDetails.lga,
        zipcode: updatedShippingDetails.zipcode,
        address: updatedShippingDetails.address,
        fullname: updatedShippingDetails.fullname,
        email: updatedShippingDetails.email,
      }
    );
    console.log("shippingAddressUpdated ", shippingAddressUpdated);
    if (shippingAddressUpdated) {
      return {
        userId: shippingAddressUpdated.userId,
        phoneNumber: shippingAddressUpdated.phoneNumber,
        country: shippingAddressUpdated.country,
        state: shippingAddressUpdated.state,
        lga: shippingAddressUpdated.lga,
        zipcode: shippingAddressUpdated.zipcode,
        address: shippingAddressUpdated.address,
        $id: shippingAddressUpdated.$id,
        fullname: shippingAddressUpdated.fullname,
        email: shippingAddressUpdated.email,
      } as ShippingDetailsProps;
    }
  } catch (error) {
    throw error;
  }
};

export const getShippingDetails = async (userId: string) => {
  try {
    const shippingAddress = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_SHIPPING_COLLECTION_ID, // collection id
      [Query.equal("userId", userId)]
    );
    const shippingDetails = shippingAddress.documents;
    return {
      userId: shippingDetails[0].userId,
      phoneNumber: shippingDetails[0].phoneNumber,
      country: shippingDetails[0].country,
      state: shippingDetails[0].state,
      lga: shippingDetails[0].lga,
      zipcode: shippingDetails[0].zipcode,
      address: shippingDetails[0].address,
      $id: shippingDetails[0].$id,
      fullname: shippingDetails[0].fullname,
      email: shippingDetails[0].email,
    } as ShippingDetailsProps;
  } catch (error) {
    throw error;
  }
};

export const saveTransaction = async (transactionData: TransactionProps) => {
  try {
    const transactionCreated = await database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_TRANSACTION_COLLECTION_ID, // collection id
      ID.unique(),
      {
        payerId: transactionData.payerId,
        amount: transactionData.amount,
        status: transactionData.status,
        transactionId: transactionData.transactionId,
        transactionRef: transactionData.transactionRef,
        payMethod: transactionData.payMethod,
      }
    );

    console.log("get transaction ", transactionCreated);

    return {
      $id: transactionCreated.$id,
      payerId: transactionCreated.payerId,
      status: transactionCreated.status,
      amount: transactionCreated.amount,
      transactionId: transactionCreated.transactionId,
      transactionRef: transactionCreated.transactionRef,
      createdAt: transactionCreated.$createdAt,
      payMethod: transactionCreated.payMethod,
    } as TransactionProps;
  } catch (error) {
    throw error;
  }
};

export const getATransaction = async (id: string) => {
  try {
    const transactionarr = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_TRANSACTION_COLLECTION_ID, // collection id
      [Query.equal("$id", id)]
    );
    const transaction = transactionarr.documents[0];

    return {
      $id: transaction.$id,
      payerId: transaction.payerId,
      status: transaction.status,
      amount: transaction.amount,
      transactionId: transaction.transactionId,
      transactionRef: transaction.transactionRef,
      createdAt: transaction.$createdAt,
      payMethod: transaction.payMethod,
    } as TransactionProps;
  } catch (error) {
    throw error;
  }
};

export const getAllTransaction = async () => {
  try {
    const transactionarr = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_TRANSACTION_COLLECTION_ID // collection id
    );
    const transactionDoc = transactionarr.documents;
    let allTransactions: TransactionProps[] = [];
    transactionDoc.forEach((transaction) => {
      let transactionItem = {
        $id: transaction.$id,
        payerId: transaction.payerId,
        status: transaction.status,
        amount: transaction.amount,
        transactionId: transaction.transactionId,
        transactionRef: transaction.transactionRef,
        createdAt: transaction.$createdAt,
        payMethod: transaction.payMethod,
      } as TransactionProps;
      allTransactions.push(transactionItem);
    });
    console.log("allTransactions ", allTransactions);
    return allTransactions;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (orderData: OrderProps) => {
  try {
    const orderCreated = await database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID, // collection id
      ID.unique(),
      {
        cart: orderData.cart,
        transaction: orderData.transaction,
        userId: orderData.userId,
      }
    );

    return {
      $id: orderCreated.$id,
      cart: orderCreated.cart,
      transaction: orderCreated.transaction,
      shippingDetail: orderData.shippingDetail,
      orderStatus: orderCreated.orderStatus,
      lastUpdated: orderCreated.$updatedAt,
      createdAt: orderCreated.$createdAt,
      userId: orderData.userId,
    } as OrderReturnProps;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (orderData: OrderStatusProps) => {
  try {
    const order = await database.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID, // collection id
      orderData.orderId,
      {
        orderStatus: orderData.status,
      }
    );

    const shippingArr = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_SHIPPING_COLLECTION_ID, // collection id
      [Query.equal("userId", orderData.userId)]
    );

    const shipping = shippingArr.documents;
    let shippingDetail = {
      userId: shipping[0].userId,
      phoneNumber: shipping[0].phoneNumber,
      country: shipping[0].country,
      state: shipping[0].state,
      lga: shipping[0].lga,
      zipcode: shipping[0].zipcode,
      address: shipping[0].address,
      $id: shipping[0].$id,
      fullname: shipping[0].fullname,
      email: shipping[0].email,
    } as ShippingDetailsProps;
    console.log("order updated service ", order);

    return {
      $id: order.$id,
      cart: order.cart,
      transaction: order.transaction,
      shippingDetail: shippingDetail,
      orderStatus: order.orderStatus,
      lastUpdated: order.$updatedAt,
      createdAt: order.$createdAt,
      userId: orderData.userId,
    } as OrderReturnProps;
  } catch (error) {
    throw error;
  }
};

export const findOrder = async (orderData: OrderArgs) => {
  try {
    let orderId = orderData.orderId,
      userId = orderData.userId;
    const orderArr = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID, // collection id
      [Query.equal("$id", orderId)]
    );

    const shippingArr = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_SHIPPING_COLLECTION_ID, // collection id
      [Query.equal("userId", userId)]
    );

    const shipping = shippingArr.documents;
    let shippingDetail = {
      userId: shipping[0].userId,
      phoneNumber: shipping[0].phoneNumber,
      country: shipping[0].country,
      state: shipping[0].state,
      lga: shipping[0].lga,
      zipcode: shipping[0].zipcode,
      address: shipping[0].address,
      $id: shipping[0].$id,
      fullname: shipping[0].fullname,
      email: shipping[0].email,
    } as ShippingDetailsProps;

    const order = orderArr.documents;

    return {
      $id: order[0].$id,
      cart: order[0].cart,
      transaction: order[0].transaction,
      orderStatus: order[0].orderStatus,
      shippingDetail: shippingDetail,
      lastUpdated: order[0].$updatedAt,
      createdAt: order[0].$createdAt,
      userId: order[0].userId,
    } as OrderReturnProps;
  } catch (error) {
    throw error;
  }
};

export const findAllOrders = async (dataProps: OrderPaginatedArgs) => {
  try {
    const p = dataProps.page;
    const offset = ((p > 0 ? p : 1) - 1) * ITEMS_PER_PAGE;

    const orderArr = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID, // collection id
      [
        Query.limit(ITEMS_PER_PAGE),
        Query.offset(offset),
        Query.equal("userId", dataProps.userId),
      ]
    );

    const shippingArr = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_SHIPPING_COLLECTION_ID, // collection id
      [Query.equal("userId", dataProps.userId)]
    );

    const shipping = shippingArr.documents;
    let shippingDetail = {
      userId: shipping[0].userId,
      phoneNumber: shipping[0].phoneNumber,
      country: shipping[0].country,
      state: shipping[0].state,
      lga: shipping[0].lga,
      zipcode: shipping[0].zipcode,
      address: shipping[0].address,
      $id: shipping[0].$id,
      fullname: shipping[0].fullname,
      email: shipping[0].email,
    } as ShippingDetailsProps;

    const allOrder: OrderReturnProps[] = orderArr.documents.map((order) => ({
      $id: order.$id,
      cart: order.cart,
      transaction: order.transaction,
      orderStatus: order.orderStatus,
      shippingDetail: shippingDetail,
      lastUpdated: order.$updatedAt,
      createdAt: order.$createdAt,
      userId: order.userId,
    }));
    console.log("allOrder service ", allOrder);
    return allOrder;
  } catch (error) {
    throw error;
  }
};

export const getTotalOrderPages = async () => {
  const response = await database.listDocuments(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID,
    [Query.limit(1)] // Limit 1 just to get the total count
  );

  const totalDocuments = response.total; // Appwrite returns total count
  const totalPages = Math.ceil(totalDocuments / ITEMS_PER_PAGE);

  return totalPages;
};
