import mongoose from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

// Getting questions -> time seconds mod 13? -> do find one from mongo docs using {difficulty: difficulty level, hash:time mod 13}
export interface IQuestionModel {
  id?: number;  
  title: string;
  difficulty: string;
  content: string;
  input: string;
  output: string;
}

const { Schema } = mongoose;
const QuestionModelSchema = new Schema<IQuestionModel>({
  id: {
    type: Number,
    required: false,
  },  
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});


QuestionModelSchema.plugin(AutoIncrement, {inc_field: 'id'});
export default mongoose.model('UserModel', QuestionModelSchema);