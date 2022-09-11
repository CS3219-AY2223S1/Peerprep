import {
  createUser,
  deleteUser,
  getId,
  isUsernameAndPasswordMatch,
  isUsernameExist,
} from "./repository";
import { IUserModel } from "./user-model";

// need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(user: IUserModel) {
  try {
    const newUser = await createUser(user);
    newUser.save();
    return true;
  } catch (err) {
    console.log("ERROR: Could not create new user");
    return { err };
  }
}

export async function ormDeleteUser(username: string) {
  try {
    await deleteUser(username);
    return true;
  } catch (err) {
    console.log("ERROR: Could not delete user");
    return false;
  }
}

export async function ormCheckUserExist(username: string) {
  try {
    return await isUsernameExist(username);
  } catch (err) {
    console.log("ERROR: Could not check if username exist");
    return false;
  }
}

export async function ormVerifyUserCredentials(
  username: string,
  password: string
) {
  try {
    return await isUsernameAndPasswordMatch(username, password);
  } catch (err) {
    console.log("ERROR: Could not check if username matches password");
    return false;
  }
}

export async function ormGetUserId(username: string) {
  try {
    return await getId(username);
  } catch (err) {
    console.log("ERROR: Could not retrieve user ID");
    return false;
  }
}
