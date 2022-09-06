import mongoose from 'mongoose';
import UserModel, { IUserModel } from './user-model';
import bcrypt from 'bcryptjs';

// Set up mongoose connection
require('dotenv').config();

const mongoDB = process.env.ENV === 'PROD' ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;
mongoose.connect(mongoDB as string);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params: IUserModel) {
  return new UserModel(params);
}

export async function isUsernameExist(username: string) {
  // return 1 if username exists else 0
  return UserModel.find({ username }, '_id').count();
}

export async function isUsernameAndPasswordMatch(username: string, password: string) {
  if (await isUsernameExist(username) !== 1) {
    return false;
  }
  const user = await UserModel.findOne({ "username" : username }).lean();
  // compares stored hashed password with user-entered password
  return await bcrypt.compare(password, user!.password);
}

export async function getId(username: string) {
  const user = await UserModel.findOne({ "username" : username }).lean();
  return user?._id;
}

