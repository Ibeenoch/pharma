import { Account, Databases, ID } from "appwrite";
import client from "../../lib/appwriteConfig";
import { UserDataProps } from "../../types/auth/UserData";

const account = new Account(client);
const database = new Databases(client);

export const registerUser = async (userData: UserDataProps) => {
  try {
    const user = await account.create(
      "unique()",
      userData.email,
      userData.password
    );
    console.log("User created successfully:", user);
    // After user creation, you can store additional data (like firstName, lastName, etc.)
    // You can use the Appwrite database service to store this information

    // Generate a custom userId (example: take the email and replace special chars)
    const userId = user.$id.replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 36);

    const userCreated = await database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_COLLECTION_ID, // collection id
      ID.unique(),
      {
        userId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        dob: userData.dob,
        role: userData.role,
        gender: userData.gender,
        passcode:
          userData && userData.role && userData.role.toLowerCase() === "admin"
            ? userData.passcode
            : "N/A",
      }
    );

    console.log("customUser created successfully:", userCreated);
    return {
      userId: user.$id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dob: userData.dob,
      role: userData.role,
      gender: userData.gender,
      passcode:
        userData.role?.toLowerCase() === "admin" ? userData.passcode : "N/A",
      password: "", // Since password should not be returned, just leave it empty
    } as UserDataProps;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (userData: UserDataProps) => {
  try {
    const session = await account.createSession(
      userData.email,
      userData.password
    );
    console.log("User login successfully:", session);

    // Access token and refresh token are available in the session response
    const accessToken = session.expire;
    const refreshToken = session.secret;
  } catch (error) {
    console.log(error);
  }
};
