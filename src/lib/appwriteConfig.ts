import { Client } from "appwrite";

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_END_POINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export default client;
