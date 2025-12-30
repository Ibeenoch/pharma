import { ID, OAuthProvider } from "appwrite";
import { account, database, storage } from "../../lib/appwriteConfig";
import { UserDataProps } from "../../types/auth/UserData";
import { Query } from "node-appwrite";
import { URL } from "../../constants/appGeneral";
import { ITEMS_PER_PAGE } from "../../constants/pagianation";
import { UserDateFilterProps } from "../../types/user/contact";

export const registerUser = async (userData: UserDataProps) => {
  try {
    const user = await account.create(
      ID.unique(),
      userData.email,
      userData.password
    );

    // after registering log the user in to create a section

    await account.createEmailPasswordSession(userData.email, userData.password);

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

    return {
      userId: user.$id,
      email: userCreated.email,
      $id: userCreated.$id,
      firstName: userCreated.firstName,
      lastName: userCreated.lastName,
      dob: userCreated.dob,
      role: userCreated.role,
      gender: userCreated.gender,
      createdAt: userCreated.$createdAt,
      passcode:
        userCreated.role?.toLowerCase() === "admin"
          ? userCreated.passcode
          : "N/A",
      password: "", // Since password should not be returned, just leave it empty
    } as UserDataProps;
  } catch (error) {
    throw error;
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
    throw error;
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
    throw error;
  }
};

export const loginUser = async (userData: UserDataProps) => {
  try {
    // 1. Log in and get the session
    const usersession = await account.createEmailPasswordSession(
      userData.email,
      userData.password
    );

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
      $id: customUserData.$id,
      createdAt: customUserData.$createdAt,
      password: "",
    } as UserDataProps;
  } catch (error) {
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
  } catch (error) {}
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
  } catch (error) {}
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
        createdAt: "",
        $id: "",
        image: "",
      } as UserDataProps;
    }
  } catch (error) {}
};

export const getCurrentLoginUser = async () => {
  // get the current login user that is redirected from google or facebook
  const user = await account.get();

  const res = await database.listDocuments(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    [Query.equal("userId", user.$id)]
  );
  if (res.documents.length > 0) {
    const userDoc = res.documents[0];

    // Access fields like:
    const firstName = userDoc.firstName;
    const lastName = userDoc.lastName;
    const dob = userDoc.dob;
    const email = userDoc.email;
    const gender = userDoc.gender;
    const role = userDoc.role;
    const passcode = userDoc.passcode;
    const userId = userDoc.userId;
    const $id = userDoc.$id;
    return {
      firstName,
      lastName,
      dob,
      gender,
      email,
      role,
      passcode,
      userId,
      $id,
      createdAt: userDoc.$createdAt,
      image: userDoc.image,
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

    return users.total > 0 ? true : false;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (p: number) => {
  try {
    const offset = ((p > 0 ? p : 1) - 1) * ITEMS_PER_PAGE; // fetch all users
    const user = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
      [Query.limit(ITEMS_PER_PAGE), Query.offset(offset)]
    );
    const userFound: UserDataProps[] = user.documents.map((u) => ({
      userId: u.userId,
      $id: u.$id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      dob: u.dob,
      role: u.role,
      gender: u.gender,
      passcode: u.passcode,
      password: u.password,
      createdAt: u.$createdAt,
      image: u.image,
    }));
    return userFound;
  } catch (error) {
    throw error;
  }
};

export const getTotalUsersPage = async () => {
  try {
    // fetch all users
    const user = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
      [Query.limit(1)]
    );
    const totalPage = user.total;
    return totalPage;
  } catch (error) {
    throw error;
  }
};

export const getAllUsersWithDateFilter = async (
  userData: UserDateFilterProps
) => {
  try {
    let offset = (userData.pageNum > 0 ? userData.pageNum : 1) * ITEMS_PER_PAGE;
    // fetch all users
    const user = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
      [
        Query.limit(ITEMS_PER_PAGE),
        Query.offset(offset),
        Query.between("$createdAt", userData.start, userData.end),
      ]
    );
    const userFound: UserDataProps[] = user.documents.map((u) => ({
      userId: u.userId,
      $id: u.$id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      dob: u.dob,
      role: u.role,
      gender: u.gender,
      passcode: u.passcode,
      password: u.password,
      createdAt: u.$createdAt,
      image: u.image,
    }));
    return userFound;
  } catch (error) {
    throw error;
  }
};

export const addUserProfilePics = async (userData: FormData) => {
  try {
    const data: Record<string, string> = {};
    userData.forEach((val, key) => {
      data[key] = val.toString();
    });
    const { userId } = data;

    const imageFiles = userData.getAll("imageFiles") as File[];

    let uploadedFiles: {
      fileId: string;
      name: string;
      mimeType: string;
    }[] = [];
    for (const image of imageFiles) {
      const res = await storage.createFile(
        import.meta.env.VITE_BUCKET_ID,
        ID.unique(),
        image
      );

      uploadedFiles.push({
        fileId: res.$id,
        name: res.name,
        mimeType: res.mimeType,
      });
    }

    let userImages: string[] = [];

    for (const fileId of uploadedFiles) {
      const res = storage.getFileDownload(
        import.meta.env.VITE_BUCKET_ID,
        fileId.fileId
      );
      userImages.push(res);
    }

    const user = await database.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
      userId,
      {
        image: userImages[0],
      }
    );

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob,
      gender: user.gender,
      email: user.email,
      role: user.role,
      passcode: user.passcode,
      userId: user.userId,
      $id: user.$id,
      createdAt: user.$createdAt,
      image: user.image,
    } as UserDataProps;
  } catch (error) {
    throw error;
  }
};
