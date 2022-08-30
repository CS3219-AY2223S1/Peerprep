import mongoose from 'mongoose';

export interface IUserModel {
  username: string;
  password: string;
}

const { Schema } = mongoose;
const UserModelSchema = new Schema<IUserModel>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('UserModel', UserModelSchema);
