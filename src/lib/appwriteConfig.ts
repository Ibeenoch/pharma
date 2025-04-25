import { Account, Client, Databases, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_END_POINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export default client;
export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
