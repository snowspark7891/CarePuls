import * as sdk from "node-appwrite";

export const ConfigVariable = {
  PROJECT_ID: '67896866000ba337846e',
  API_KEY: 'standard_4bf2ddd6db0c96f363af50fccb99e296672b09b247c522c520b7317e0a4925b8178e52a408aa362c431f19efa03758a6a0a0f71e235cb8d7b52795956e3b16975bfe3959abd990ce0d6dd14184257cf48936eb20a1fa4b800d4fdfb4f8226a4a9fcd60f0027bac0832916960a47efd34513cca6e62067525b998adff8a034f60',
  PROJECT_DATABASEID: '678969580034c341f514',
  PAITION_COLLECTION_ID: '67896990002eeef5ae80',
  DOCTOR_COLLECTION_ID: '678969c3002be632fc88',
  APPOINTMENT_COLLECTION_ID: '67896a04003c9feb61c5',
  NEXT_PUBLIC_BUCKET_ID: '67896a4d00330e05ec2e',
  NEXT_PUBLIC_ENDPOINT: 'https://cloud.appwrite.io/v1'
};

const client = new sdk.Client();

client
  .setEndpoint(ConfigVariable.NEXT_PUBLIC_ENDPOINT)
  .setProject(ConfigVariable.PROJECT_ID)
  .setKey(ConfigVariable.API_KEY);

export const databases = new sdk.Databases(client); // Export functionality of appwrite client
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);