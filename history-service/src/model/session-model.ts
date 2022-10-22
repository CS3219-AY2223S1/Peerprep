import mongoose from 'mongoose';

export interface ISessionModel {
    username: String;
    partnername: String;
    completedOn: Date;
    duration: String;
    difficulty: String;
    code: String;
}

const { Schema } = mongoose;
const SessionModelSchema = new Schema<ISessionModel>({
    username: {
        type: String,
        required: true,
    },
    partnername: {
        type: String,
        required: true,
    },
    completedOn: {
        type: Date,
        required: true,
    },
    duration: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        require: true
    },
    code: {
        type: String
    }
});

export default mongoose.model('SessionModel', SessionModelSchema);
