import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import SessionModel, { ISessionModel } from './session-model';

dotenv.config();

const mongoDB = process.env.ENV === 'PROD'
  ? process.env.DB_CLOUD_URI
  : process.env.DB_LOCAL_URI;
mongoose.connect(mongoDB as string);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createSession(params: ISessionModel) {
  return new SessionModel(params);
}

export async function getSession(options: any) {
  return SessionModel.find(options).sort({ _id: -1 });
}
