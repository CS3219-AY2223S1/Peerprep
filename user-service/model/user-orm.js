import { createUser, isUsernameExist } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const newUser = await createUser({username, password});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

export async function ormCheckUserExist(username) {
    try {
        return await isUsernameExist(username);
    } catch (err) {
        console.log('ERROR: Could not check if username exist');
        return { err };
    }
}
