'use server'
import { ID, Query } from "node-appwrite";
import {
  ConfigVariable,
  databases,
  storage,
  users,
} from "../apwrite/appwrite.config";
import { parseStringify } from "../utils";
import {InputFile } from 'node-appwrite/file';
import { log } from "console";

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("calling");
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    console.log(newUser);
    return newUser;
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", user.email)]);
      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
          
    console.log('we get the user');
    
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    console.log(userId);
    
    const patient = await databases.listDocuments(
      ConfigVariable.PROJECT_DATABASEID,
      ConfigVariable.PAITION_COLLECTION_ID,
      [
        Query.equal('userId',userId)
      ]
    );
          
    console.log('we get the patient');
    
    return parseStringify(patient.documents[0]);
  } catch (error) {
    console.log(error);
  }
};


export const registerPaient = async ({identificationDocument, ...patient}:RegisterUserParams
) => {
  try {
     let file;
     if  (identificationDocument){
      console.log('documrnts are exist !');
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.getAll('blobFile') as unknown as Blob,
        identificationDocument?.getAll('fileName') as unknown as string,
      )
      
      file = await storage.createFile(ConfigVariable.NEXT_PUBLIC_BUCKET_ID!,ID.unique(),inputFile)
     }
     
     const newPaitent = await databases.createDocument(
      ConfigVariable.PROJECT_DATABASEID,
      ConfigVariable.PAITION_COLLECTION_ID,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl : `${ConfigVariable.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${ConfigVariable.NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view?project=${ConfigVariable.PROJECT_ID}`,
        ...patient
      }
     )
    
     console.log('paitent created in bucket');
     
    return parseStringify( newPaitent); 
  } catch (error) {
    console.log(error);
    
  }
}




// export const registerPaient = async ({
//   identificationDocument,
//   ...patient
// }: RegisterUserParams) => {
//   try {
//     let fileId;
//     if (identificationDocument) {
//       // Call the API route to handle file upload
//       const response = await fetch("/api/uploadFile", {
//         method: "POST",
//         body: identificationDocument,
//       });

//       if (response.ok) {
//         const result = await response.json();
//         fileId = result.fileId;
//       } else {
//         throw new Error("File upload failed");
//       }
//     }

//     const newPatient = await databases.createDocument(
//       ConfigVariable.PROJECT_DATABASEID!,
//       ConfigVariable.PAITION_COLLECTION_ID!,
//       ID.unique(),
//       {
//         identificationDocumentId: fileId || null,
//         identificationDocumentUrl: fileId
//           ? `${ConfigVariable.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${ConfigVariable.NEXT_PUBLIC_BUCKET_ID}/files/${fileId}/view?project=${ConfigVariable.PROJECT_ID}`
//           : null,
//         ...patient,
//       }
//     );

//     return parseStringify(newPatient);
//   } catch (error) {
//     console.log(error);
//   }
// };


// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { ID, Query } from "node-appwrite";
// import {
//   ConfigVariable,
//   databases,
//   storage,
//   users,
// } from "../apwrite/appwrite.config";
// import { parseStringify } from "../utils";
// import { InputFile } from "node-appwrite/file";

// export const createUser = async (user: CreateUserParams) => {
//   try {
//     console.log("calling");
//     const newUser = await users.create(
//       ID.unique(),
//       user.email,
//       user.phone,
//       undefined,
//       user.name
//     );

//     console.log(newUser);
//     return newUser;
//   } catch (error: any) {
//     if (error && error?.code === 409) {
//       const documents = await users.list([Query.equal("email", user.email)]);
//       return documents?.users[0];
//     }
//   }
// };

// export const getUser = async (userId: string) => {
//   try {
//     const user = await users.get(userId);

//     return parseStringify(user);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const registerPaient = async ({
//   identificationDocument,
//   ...patient
// }: RegisterUserParams) => {
//   try {
//     let file;
//     if (identificationDocument) {
//       const inputFile = InputFile.fromBuffer(
//         identificationDocument?.get('blobFile') as Blob,
//         identificationDocument.get('fileName') as string
//       )

//       file = await storage.createFile(
//         ConfigVariable.NEXT_PUBLIC_BUCKET_ID!,
//         ID.unique(),
//         inputFile
//       );
//     }

//     const newPatient = await databases.createDocument(
//       ConfigVariable.PROJECT_DATABASEID!,
//       ConfigVariable.PAITION_COLLECTION_ID!,
//       ID.unique(),
//       {
//         identificationDocumentId: file?.$id || null,
//         identificationDocumentUrl: `${ConfigVariable.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${ConfigVariable.NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view?project=${ConfigVariable.PROJECT_ID}`,
//         ...patient
//       }
//     );

//      return parseStringify(newPatient);
//   } catch (error) {
//     console.log(error);
//   }
// };
