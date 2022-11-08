import {
    isQuestionExist,
    addQuestion,
    deleteQuestion,
    getQuestions
  } from "./repository";
  import { IQuestionModel } from "./question-model";
  
  // need to separate orm functions from repository to decouple business logic from persistence
  export async function ormAddQuestion(question: IQuestionModel) {
    try {
      const newQuestion = await addQuestion(question);
      newQuestion.save();
      return true;
    } catch (err) {
      console.log("ERROR: Could not add new question");
      return { err };
    }
  }
  
  export async function ormDeleteQuestion(questionTitle: string) {
    try {
      await deleteQuestion(questionTitle);
      return true;
    } catch (err) {
      console.log("ERROR: Could not delete question");
      return false;
    }
  }

  export async function ormGetRandomQuestion(difficultyLevel: string) {
    const questions = await getQuestions(difficultyLevel);
    const randomElement = questions[Math.floor(Math.random() * questions.length)];
    return randomElement
  }

  export async function ormCheckQuestionExist(questionTitle: string) {
    try {
      const counter = await isQuestionExist(questionTitle);
      console.log("counter here is:", counter);
      return counter == 0 ? false : true;
    } catch (err) {
      console.log("ERROR: Could not check if question exist");
      return false;
    }
  }

  