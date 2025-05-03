import { ID, Query } from "appwrite";
import { database } from "../../lib/appwriteConfig";
import {
  AllOrderResultData,
  OrderArgs,
  OrderPaginatedArgs,
  OrderPaginatedFilteredArgs,
  OrderProps,
  OrderStatusProps,
  ShippingDetailsProps,
  ShippingServiceProps,
  ShippingServiceUpdateProps,
  UpdateShippingArgs,
} from "../../types/order/OrderType";
import { TransactionDateFilterProps, TransactionProps } from "../../types/payment/FlutterwavePaymentType";
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
    if (checkIfShippingAdressExist.length > 0) {
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
    console.log('userId ', userId);
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

      // imageUrl: string[];
      // productName: string[];
      // productQty: string[];
      // shippingId: string;
      // shippingType: string;
      // shippingStatus: string;
      // customerName: string;
      {
        payerId: transactionData.payerId,
        amount: transactionData.amount,
        status: transactionData.status,
        transactionId: transactionData.transactionId,
        transactionRef: transactionData.transactionRef,
        payMethod: transactionData.payMethod,
        imageUrl: transactionData.imageUrl,
        productName: transactionData.productName,
        productQty: transactionData.productQty,
        shippingId: transactionData.shippingId,
        shippingType: transactionData.shippingType,
        shippingStatus: transactionData.shippingStatus,
        customerName: transactionData.customerName,
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
      imageUrl: transactionCreated.imageUrl,
      productName: transactionCreated.productName,
      productQty: transactionCreated.productQty,
      shippingId: transactionCreated.shippingId,
      shippingType: transactionCreated.shippingType,
      shippingStatus: transactionCreated.shippingStatus,
      customerName: transactionCreated.customerName,
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
      imageUrl: transaction.imageUrl,
      productName: transaction.productName,
      productQty: transaction.productQty,
      shippingId: transaction.shippingId,
      shippingType: transaction.shippingType,
      shippingStatus: transaction.shippingStatus,
      customerName: transaction.customerName,
    } as TransactionProps;
  } catch (error) {
    throw error;
  }
};

export const getAllTransaction = async (pageNum:  number) => {
  try {
    let ItemPerPage = 6;
    let offset = ((pageNum > 0 ? pageNum : 1) - 1) * ItemPerPage;
    const transactionarr = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_TRANSACTION_COLLECTION_ID, // collection id
      [
        Query.limit(ItemPerPage),
        Query.offset(offset),
      ]
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
        imageUrl: transaction.imageUrl,
        productName: transaction.productName,
        productQty: transaction.productQty,
        shippingId: transaction.shippingId,
        shippingType: transaction.shippingType,
        shippingStatus: transaction.shippingStatus,
        customerName: transaction.customerName,
      } as TransactionProps;
      allTransactions.push(transactionItem);
    });
    console.log("allTransactions ", allTransactions);
    return allTransactions;
  } catch (error) {
    throw error;
  }
};

export const getAllTransactionFilteredByDate = async (pageData:  TransactionDateFilterProps) => {
  try {
    let ItemPerPage = 6;
    let offset = ((pageData.pageNum > 0 ? pageData.pageNum : 1) - 1) * ItemPerPage;
    const transactionarr = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_TRANSACTION_COLLECTION_ID, // collection id
      [
        Query.limit(ItemPerPage),
        Query.offset(offset),
        Query.between('$createdAt', pageData.start, pageData.end)
      ]
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
        imageUrl: transaction.imageUrl,
        productName: transaction.productName,
        productQty: transaction.productQty,
        shippingId: transaction.shippingId,
        shippingType: transaction.shippingType,
        shippingStatus: transaction.shippingStatus,
        customerName: transaction.customerName,
      } as TransactionProps;
      allTransactions.push(transactionItem);
    });
    console.log("allTransactions ", allTransactions);
    return allTransactions;
  } catch (error) {
    throw error;
  }
};

export const getAllTransactionWithoutPagination = async () => {
  try {

    const transactionarr = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_TRANSACTION_COLLECTION_ID, // collection id
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
        imageUrl: transaction.imageUrl,
        productName: transaction.productName,
        productQty: transaction.productQty,
        shippingId: transaction.shippingId,
        shippingType: transaction.shippingType,
        shippingStatus: transaction.shippingStatus,
        customerName: transaction.customerName,
      } as TransactionProps;
      allTransactions.push(transactionItem);
    });
    console.log("allTransactions ", allTransactions);
    return allTransactions;
  } catch (error) {
    throw error;
  }
};

export const createShippingService = async (
  shippingData: ShippingServiceProps
) => {
  try {
    const shippingCreated = await database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_SHIPPING_SERVICE_COLLECTION_ID, // collection id
      ID.unique(),
      {
        shippingStatus: shippingData.shippingStatus,
        shippingType: shippingData.shippingType,
      }
    );
    console.log("createShippingService ", shippingCreated);

    return {
      $id: shippingCreated.$id,
      $createdAt: shippingCreated.$createdAt,
      $updatedAt: shippingCreated.$updatedAt,
      shippingStatus: shippingCreated.shippingStatus,
      shippingType: shippingCreated.shippingType,
    } as ShippingServiceProps;
  } catch (error) {
    throw error;
  }
};

export const getAShippingService = async (id: string) => {
  try {
    const shippingArr = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_SHIPPING_SERVICE_COLLECTION_ID, // collection id
      [Query.equal("$id", id)]
    );
    const shipping = shippingArr.documents[0];
    console.log("service shipped ", shipping);
    return {
      shippingStatus: shipping.shippingStatus,
      shippingType: shipping.shippingType,
      $createdAt: shipping.$createdAt,
      $id: shipping.$id,
      $updatedAt: shipping.$updatedAt,
    } as ShippingServiceProps;
  } catch (error) {
    throw error;
  }
};

export const updateShippingServiceStatus = async (
  shippingDetails: ShippingServiceUpdateProps
) => {
  const shippedStatus = shippingDetails.shippingStatus;
  try {
    const shippingUpdated = await database.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_SHIPPING_SERVICE_COLLECTION_ID, // collection id
      shippingDetails.$id,
      {
        shippingStatus: shippedStatus,
      }
    );
    console.log("shippingAddressUpdated ", shippingUpdated);
    if (shippingUpdated) {
      return {
        shippingStatus: shippingUpdated.shippingStatus,
        shippingType: shippingUpdated.shippingType,
        $createdAt: shippingUpdated.$createdAt,
        $id: shippingUpdated.$id,
        $updatedAt: shippingUpdated.$updatedAt,
      } as ShippingServiceProps;
    }
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
        transaction: {
          amount: orderData.transaction.amount,
          customerName: orderData.transaction.customerName,
          imageUrl: orderData.transaction.imageUrl,
          payerId: orderData.transaction.payerId,
          payMethod: orderData.transaction.payMethod,
          productName: orderData.transaction.productName,
          productQty: orderData.transaction.productQty,
          shippingId: orderData.transaction.shippingId,
          shippingStatus: orderData.transaction.shippingStatus,
          shippingType: orderData.transaction.shippingType,
          status: orderData.transaction.status,
          transactionId: orderData.transaction.transactionId,
          transactionRef: orderData.transaction.transactionRef,
        },
        userId: orderData.userId,
        orderStatus: "Processing",
        shippingDetails: {
          userId: orderData.shippingDetails.userId,
          phoneNumber: orderData.shippingDetails.phoneNumber,
          country: orderData.shippingDetails.country,
          state: orderData.shippingDetails.state,
          lga: orderData.shippingDetails.lga,
          zipcode: orderData.shippingDetails.zipcode,
          address: orderData.shippingDetails.address,
          fullname: orderData.shippingDetails.fullname,
          email: orderData.shippingDetails.email,
        },
      }
    );

    console.log("created order : ", orderCreated);

    return {
      $id: orderCreated.$id,
      $createdAt: orderCreated.$createdAt,
      $updatedAt: orderCreated.$createdAt,
      cart: orderCreated.cart,
      orderStatus: orderCreated.orderStatus,
      shippingDetails: orderCreated.shippingDetails,
      transaction: orderCreated.transaction,
      userId: orderCreated.userId,
    } as AllOrderResultData;
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

    return {
      $id: order.$id,
      $createdAt: order.$createdAt,
      $updatedAt: order.$createdAt,
      cart: order.cart,
      orderStatus: order.orderStatus,
      shippingDetails: order.shippingDetails,
      transaction: order.transaction,
      userId: order.userId,
    } as AllOrderResultData;
  } catch (error) {
    throw error;
  }
};

export const findOrder = async (orderData: OrderArgs) => {
  try {
    let orderId = orderData.orderId;
    const orderArr = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID, // collection id
      [Query.equal("$id", orderId)]
    );

    const order = orderArr.documents;

    return {
      $id: order[0].$id,
      $createdAt: order[0].$createdAt,
      $updatedAt: order[0].$createdAt,
      cart: order[0].cart,
      orderStatus: order[0].orderStatus,
      shippingDetails: order[0].shippingDetail,
      transaction: order[0].transaction,
      userId: order[0].userId,
    } as AllOrderResultData;
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

    const allOrder: AllOrderResultData[] = orderArr.documents.map((order) => ({
      $id: order.$id,
      $createdAt: order.$createdAt,
      $updatedAt: order.$createdAt,
      cart: order.cart,
      orderStatus: order.orderStatus,
      shippingDetails: order.shippingDetails,
      transaction: order.transaction,
      userId: order.userId,
    }));

    return allOrder;
  } catch (error) {
    throw error;
  }
};

export const filterOrdersWithDate = async (dataProps: OrderPaginatedFilteredArgs) => {
  try {
    const p = dataProps.page;
    const offset = ((p > 0 ? p : 1) - 1) * ITEMS_PER_PAGE;
    console.log('dataProps ', dataProps)
    const orderArr = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID, // collection id
      [
        Query.limit(ITEMS_PER_PAGE),
        Query.offset(offset),
        Query.equal("userId", dataProps.userId),
        Query.between("$createdAt", dataProps.start, dataProps.end)
      ]
    );

    const allOrder: AllOrderResultData[] = orderArr.documents.map((order) => ({
      $id: order.$id,
      $createdAt: order.$createdAt,
      $updatedAt: order.$createdAt,
      cart: order.cart,
      orderStatus: order.orderStatus,
      shippingDetails: order.shippingDetails,
      transaction: order.transaction,
      userId: order.userId,
    }));

    return allOrder;
  } catch (error) {
    throw error;
  }
};

export const gettotalTrasactionPages = async () => {
  const response = await database.listDocuments(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_TRANSACTION_COLLECTION_ID,
    [Query.limit(1)] // Limit 1 just to get the total count
  );

  const totalDocuments = response.total; // Appwrite returns total count
  const totalPages = Math.ceil(totalDocuments / ITEMS_PER_PAGE);

  return totalPages;
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
