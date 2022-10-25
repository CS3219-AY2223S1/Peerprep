import mongoose from 'mongoose';

export interface ISessionModel {
  userOneName: String;
  userTwoName: String;
  completedOn: Date;
  duration: String;
  roomUuid: String;
  difficulty: String;
  code: String;
}

const { Schema } = mongoose;
const SessionModelSchema = new Schema<ISessionModel>({
  userOneName: {
    type: String,
    required: true,
  },
  userTwoName: {
    type: String,
    required: true,
  },
  completedOn: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  roomUuid: {
    type: String,
    unique: true,
    required: true,
  },
  difficulty: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
});

export default mongoose.model('SessionModel', SessionModelSchema);
