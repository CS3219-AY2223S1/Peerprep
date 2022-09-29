import mongoose from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);


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


UserModelSchema.plugin(AutoIncrement, {inc_field: 'id'});
export default mongoose.model('UserModel', UserModelSchema);
