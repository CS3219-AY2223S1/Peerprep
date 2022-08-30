import { createUser, isUsernameExist } from './repository';
import { IUserModel } from './user-model';

// need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(user: IUserModel) {
  try {
    const newUser = await createUser(user);
    newUser.save();
    return true;
  } catch (err) {
    console.log('ERROR: Could not create new user');
    return { err };
  }
}

export async function ormCheckUserExist(username: string) {
  try {
    return await isUsernameExist(username);
  } catch (err) {
    console.log('ERROR: Could not check if username exist');
    return false;
  }
}
