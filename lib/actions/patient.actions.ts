/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID, Query } from "node-appwrite";
import { API_KEY, users } from "../apwrite/appwrite.config";

const D = API_KEY;
export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("calling");
    console.log(D);
    console.log("calling");
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.username
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
