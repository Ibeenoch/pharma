import { ID } from "appwrite";
import { database } from "../../lib/appwriteConfig";
import { ContactProps, EmailSubProps } from "../../types/user/contact";

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

export const getContactMsg = async() => {
    try {

      const contacts = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
        import.meta.env.VITE_APPWRITE_CONTACT_ID, // product collection id
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

export const getEmailSub = async() => {
    try {

      const emails = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
        import.meta.env.VITE_APPWRITE_EMAIL_SUB_ID, // product collection id
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
