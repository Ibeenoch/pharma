import { ID } from "appwrite";
import { database } from "../../lib/appwriteConfig";
import { ContactProps, EmailSubProps } from "../../types/user/contact";
import { Query } from "node-appwrite";
import { ITEMS_PER_PAGE } from "../../constants/pagianation";

// Handles API calls for home data

export const sendContactMsg = async(contactData: ContactProps) => {
    try {
       const { email, firstName, lastName, message, phone } = contactData;
    const contactCreation = await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
        import.meta.env.VITE_APPWRITE_CONTACT_ID, // product collection id
        ID.unique(),
        {
            email, firstName, lastName, message, phone
        }
      );
  
      return {
        firstName: contactCreation.firstName,
        lastName: contactCreation.lastName,
        $id: contactCreation.$id,
        $createdAt: contactCreation.$createdAt,
        email: contactCreation.email,
        message: contactCreation.message,
        phone: contactCreation.phone,
      } as ContactProps; 
    } catch (error) {
        throw error;
    }

}

export const getContactMsg = async(p: number) => {
    try {
      let offset = ((p > 0 ? p : 1) -1) * 6
      const contacts = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
        import.meta.env.VITE_APPWRITE_CONTACT_ID, // product collection id
        [
          Query.limit(6),
          Query.offset(offset)
        ]
      );

      const getContacts = contacts.documents.map((contact) => ({
        firstName: contact.firstName,
        lastName: contact.lastName,
        $id: contact.$id,
        $createdAt: contact.$createdAt,
        email: contact.email,
        message: contact.message,
        phone: contact.phone,
      }))
  
      return getContacts;
    } catch (error) {
        throw error;
    }

}

export const getTotalPageForContactMsg = async() => {
    try {

      const contacts = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
        import.meta.env.VITE_APPWRITE_CONTACT_ID, // product collection id
        [
          Query.limit(1)
        ]
      );

      const getContacts = contacts.total;
      return getContacts;
    } catch (error) {
        throw error;
    }

}

export const sendEmailSub = async(email: string) => {
    try {
    const emailCreation = await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
        import.meta.env.VITE_APPWRITE_EMAIL_SUB_ID, // product collection id
        ID.unique(),
        {
            email
        }
      );
  
      return {
        $id: emailCreation.$id,
        $createdAt: emailCreation.$createdAt,
        email: emailCreation.email,

      } as EmailSubProps; 
    } catch (error) {
        throw error;
    }

}

export const getEmailSub = async(p: number) => {
    try {
      let offset = ((p > 0 ? p : 1) -1) * ITEMS_PER_PAGE

      const emails = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
        import.meta.env.VITE_APPWRITE_EMAIL_SUB_ID, // product collection id
        [
          Query.limit(ITEMS_PER_PAGE),
          Query.offset(offset)
        ]
      );

      const getEmail = emails.documents.map((email) => ({
        $id: email.$id,
        $createdAt: email.$createdAt,
        email: email.email,
      }))
  
      return getEmail;
    } catch (error) {
        throw error;
    }

}

export const getTotalPageForEmailSub = async() => {
    try {

      const emails = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
        import.meta.env.VITE_APPWRITE_EMAIL_SUB_ID, // product collection id
        [
          Query.limit(1)
        ]
      );

      const getEmail = emails.total;
  
      return getEmail;
    } catch (error) {
        throw error;
    }

}

