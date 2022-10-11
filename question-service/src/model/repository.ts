import mongoose from "mongoose";
import QuestionModel, { IQuestionModel } from "./question-model";

// Set up mongoose connection
require("dotenv").config();

const mongoDB = process.env.DB_CLOUD_URI;
mongoose.connect(mongoDB as string);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Add question
export async function addQuestion(params: IQuestionModel) {
  return new QuestionModel(params);
}

export async function isQuestionExist(questionTitle: string) {
  // return 1 if username exists else 0
  const counter =  QuestionModel.find({ title: questionTitle }).count({ limit: 1 });
  console.log("in repository, counter is ", counter, questionTitle);
  return counter;
}

// Delete
export async function deleteQuestion(question: string) {
  await QuestionModel.deleteOne({ title: question })
    .then(() => {
      console.log("question deleted!");
     })
    .catch((Error) => {
      return Error;
    });
}

// QuestionModel.find(difficulty: difficultyLevel) -> we take all and randomly select 1

export async function getQuestions(difficultyLevel: string) {
    const problems = QuestionModel.find({ difficulty: difficultyLevel });
    return problems;
    // need formatting of data
    //randomise and pick one
    // return one
 
}
