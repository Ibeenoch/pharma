import { ID, OAuthProvider } from "appwrite";
import { account, database } from "../../lib/appwriteConfig";
import { UserDataProps } from "../../types/auth/UserData";
import { Query } from "node-appwrite";
import { URL } from "../../constants/appGeneral";

export const registerUser = async (userData: UserDataProps) => {
  try {
    const user = await account.create(
      ID.unique(),
      userData.email,
      userData.password
    );

    // after registering log the user in to create a section

    await account.createEmailPasswordSession(userData.email, userData.password);
    const verify = await account.createVerification(
      `${URL}/verify/successfully`
    );
    // After user creation, you can store additional data (like firstName, lastName, etc.)
    // You can use the Appwrite database service to store this information

    const userCreated = await database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID, // collection id
      ID.unique(),
      {
        userId: user.$id,
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

    console.log("customUser created successfully:", userCreated, verify);
    return {
      userId: user.$id,
      email: userCreated.email,
      firstName: userCreated.firstName,
      lastName: userCreated.lastName,
      dob: userCreated.dob,
      role: userCreated.role,
      gender: userCreated.gender,
      passcode:
        userCreated.role?.toLowerCase() === "admin"
          ? userCreated.passcode
          : "N/A",
      password: "", // Since password should not be returned, just leave it empty
    } as UserDataProps;
  } catch (error) {
    throw error;
    console.log(error);
  }
};

export const loginWithGoogle = async () => {
  try {
    account.createOAuth2Session(
      OAuthProvider.Google,
      `${URL}/`, // success redirect
      `${URL}/login`, // failure redirect
      ["openid", "email", "profile"]
    );
  } catch (error) {
    console.log(error);
  }
};

export const loginWithFacebook = async () => {
  try {
    account.createOAuth2Session(
      OAuthProvider.Facebook,
      `${URL}/`, // success redirect
      `${URL}/login`, // failure redirect
      ["email"]
    );
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (userData: UserDataProps) => {
  try {
    // 1. Log in and get the session
    const usersession = await account.createEmailPasswordSession(
      userData.email,
      userData.password
    );
    console.log("User login successfully:", usersession);

    const sessionId = usersession.$id; // can be treated as access token

    // 2. Get logged in user's basic info (like $id)
    const accountInfo = await account.get();
    const userId = accountInfo.$id;

    // 3. Fetch user's extra details from your custom collection
    const result = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );
    const customUserData = result.documents[0]; // Assuming only one per userId
    return {
      accessToken: sessionId,
      userId,
      email: accountInfo.email,
      firstName: customUserData.firstName,
      lastName: customUserData.lastName,
      dob: customUserData.dob,
      gender: customUserData.gender,
      role: customUserData.role,
      password: "",
    } as UserDataProps;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createActivateEmailVerification = async (verifyData: {
  userId: string;
  secret: string;
}) => {
  const userId = verifyData.userId,
    secret = verifyData.secret;

  const res = await account.updateVerification(userId, secret);
  if (res) return true;
};
export const passwordRecoveryLink = async (email: string) => {
  try {
    const res = await account.createRecovery(email, `${URL}/resetpassword`);
    if (res) return true;
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (resetPasswordData: {
  userId: string;
  secret: string;
  password: string;
}) => {
  try {
    const password = resetPasswordData.password,
      secret = resetPasswordData.secret,
      userId = resetPasswordData.userId;
    const res = await account.updateRecovery(userId, secret, password);
    if (res) return true;
  } catch (error) {
    console.log(error);
  }
};

export const logOut = async () => {
  try {
    const res = await account.deleteSessions();
    if (res) {
      return {
        userId: "",
        email: "",
        firstName: "",
        lastName: "",
        dob: "",
        role: "",
        gender: "",
        passcode: "",
        password: "",
      } as UserDataProps;
    }
  } catch (error) {
    console.log("");
  }
};

export const getCurrentLoginUser = async () => {
  // get the current login user that is redirected from google or facebook
  const user = await account.get();
  console.log("Logged-in Google user:", user);
  const res = await database.listDocuments(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    [Query.equal("userId", user.$id)]
  );
  if (res.documents.length > 0) {
    const userDoc = res.documents[0];
    console.log("Custom user data:", userDoc);

    // Access fields like:
    const firstName = userDoc.firstName;
    const lastName = userDoc.lastName;
    const dob = userDoc.dob;
    const email = userDoc.email;
    const gender = userDoc.gender;
    const role = userDoc.role;
    const passcode = userDoc.passcode;
    const userId = userDoc.userId;
    return {
      firstName,
      lastName,
      dob,
      gender,
      email,
      role,
      passcode,
      userId,
    } as UserDataProps;
  } else {
    await database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // database id
      import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID, // collection id
      ID.unique(),
      {
        userId: user.$id,
        email: user.email,
        firstName: user.name.split(" ")[1],
        lastName: user.name.split(" ")[0],
        dob: "n/a",
        role: "n/a",
        gender: "n/a",
        passcode: "n/a",
      }
    );
  }
};

export const checkIfUserExist = async (email: string) => {
  try {
    // fetch all users
    // account.listIdentities,  account.listLogs, account.listMfaFactors, account.listSessions
    const users = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
      [Query.equal("email", email)]
    );

    console.log("email found is ", users.total);
    return users.total > 0 ? true : false;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    // fetch all users
    // account.listIdentities,  account.listLogs, account.listMfaFactors, account.listSessions
    const user = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID
    );
    const userFound: UserDataProps[] = user.documents.map((u) => ({
      userId: u.userId,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      dob: u.dob,
      role: u.role,
      gender: u.gender,
      passcode: u.passcode,
      password: u.password,
    }));
    return userFound;
  } catch (error) {
    throw error;
  }
};
