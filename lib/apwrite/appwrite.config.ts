import * as sdk from "node-appwrite";
import dotenv from "dotenv";

// Load environment variables from .env.local file
dotenv.config({ path: ".env.local" });

export const {
  PROJECT_ID,
  API_KEY,
  PROJECT_DATABASEID,
  PAITION_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env; // Destructuring all the things

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1"!)
  .setProject("67896866000ba337846e"!)
  .setKey(
    "standard_4bf2ddd6db0c96f363af50fccb99e296672b09b247c522c520b7317e0a4925b8178e52a408aa362c431f19efa03758a6a0a0f71e235cb8d7b52795956e3b16975bfe3959abd990ce0d6dd14184257cf48936eb20a1fa4b800d4fdfb4f8226a4a9fcd60f0027bac0832916960a47efd34513cca6e62067525b998adff8a034f60"!
  );

export const databases = new sdk.Databases(client); // Export functionality of appwrite client
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);






// import * as sdk from 'node-appwrite'

// // Load environment variables from .env.local file

// export const {
//   PROJECT_ID,
//   API_KEY,
//   PROJECT_DATABASEID,
//   PAITION_COLLECTION_ID,
//   DOCTOR_COLLECTION_ID,
//   APPOINTMENT_COLLECTION_ID,
//   NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
//   NEXT_PUBLIC_ENDPOINT: ENDPOINT
// }= process.env; //destructuring all the things

// const client = new sdk.Client()

// client.
//     setEndpoint(ENDPOINT!)
//     .setProject(PROJECT_ID!)
//     .setKey(API_KEY!)

// export const databases = new sdk.Databases(client);             //export functionality of appwrite client
// export const storage = new sdk.Databases(client);
// export const messageing = new sdk.Databases(client);
// export const users = new sdk.Users(client);
// console.log(API_KEY);
