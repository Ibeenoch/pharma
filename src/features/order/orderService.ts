import { ID, Query } from "appwrite";
import { database } from "../../lib/appwriteConfig";
import { ShippingDetailsProps } from "../../types/order/OrderType";

// service order
export const addShippingDetails = async (
  addShippingDetails: ShippingDetailsProps
) => {
  try {
    const shippingAddressCreated = await database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_SHIPPING_COLLECTION_ID, // collection id
      ID.unique(),
      {
        userId: addShippingDetails.userId,
        phoneNo: addShippingDetails.phoneNo,
        country: addShippingDetails.country,
        state: addShippingDetails.state,
        lga: addShippingDetails.lga,
        zipcode: addShippingDetails.zipcode,
        address: addShippingDetails.address,
      }
    );

    if (shippingAddressCreated) return true;
    return false;
  } catch (error) {
    throw error;
  }
};

export const updateShippingDetails = async (
  shippingDetailsId: string,
  updatedShippingDetails: ShippingDetailsProps
) => {
  try {
    const shippingAddressUpdated = await database.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_SHIPPING_COLLECTION_ID, // collection id
      shippingDetailsId,
      {
        userId: updatedShippingDetails.userId,
        phoneNo: updatedShippingDetails.phoneNo,
        country: updatedShippingDetails.country,
        state: updatedShippingDetails.state,
        lga: updatedShippingDetails.lga,
        zipcode: updatedShippingDetails.zipcode,
        address: updatedShippingDetails.address,
      }
    );
    console.log("shippingAddressUpdated ", shippingAddressUpdated);
    if (shippingAddressUpdated) return true;
    return false;
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

    let shippingDetails: ShippingDetailsProps[] = shippingAddress.documents.map(
      (d) => ({
        userId: d.userId,
        phoneNo: d.phoneNo,
        country: d.country,
        state: d.state,
        lga: d.lga,
        zipcode: d.zipcode,
        address: d.address,
      })
    );
    console.log("shippingDetails ", shippingDetails);
    return shippingDetails;
  } catch (error) {
    throw error;
  }
};
