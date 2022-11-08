import { Request, Response } from "express";
import { Get, Post, string } from "@tsed/schema";
import { Controller } from "@tsed/di";
import {
  ormAddQuestion as _createQuestion,
  ormCheckQuestionExist as _checkQuestionExist,
  ormDeleteQuestion as _deleteQuestion,
  ormGetRandomQuestion as _getRandomQuestion,
} from "../model/question-orm";
import { verifyUser } from "./AuthMiddleWare";

@Controller("/questions")
export default class QuestionCtrl {
  @Post("/add")
  async createQuestion(req: Request, res: Response) {
    try {
      const { title, difficulty, content, input, output } = req.body;
      console.log(title);
      if (title && difficulty && content && input && output) {
        // check if user exists

        const isExist = await _checkQuestionExist(title);
        if (isExist) {
          return res.status(409).json({ message: "Question already exists!" });
        }

        // create a new user
        const resp = await _createQuestion({
          title,
          difficulty,
          content,
          input,
          output,
        });
        console.log(resp);
        if (!resp) {
          return res
            .status(400)
            .json({ message: "Could not create a new question!" });
        }
        console.log(`Created new question ${title} successfully!`);
        return res
          .status(200)
          .json({ message: `Created new question ${title} successfully!` });
      }
      return res.status(401).json({ message: "Some parameters are missing!" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Database failure when creating new question!" });
    }
  }

  @Post("/delete")
  async deleteQuestion(req: Request, res: Response) {
    const { title } = req.body;

    if (!title) {
      return res.status(401).json({ message: "Question title is missing!" });
    }
    const success = await _deleteQuestion(title);
    if (success) {
      return res
        .status(200)
        .json({ message: "Question successfully deleted!" });
    } else {
      return res
        .status(500)
        .json({ message: "Question unable to be deleted!" });
    }
  }

  @Get("/getRandomQuestion")
  async getQuestions(req: Request, res: Response) {
    const difficulty = req.headers.difficulty as string;
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Access token is missing! " });
    }
    const success = await verifyUser(token);
    if (!success) {
      return res.status(403).json({ message: "Invalid access token! " });
    }
    if (!difficulty) {
      return res
        .status(401)
        .json({ message: "Question difficulty is missing! " });
    }
    try {
      const result = await _getRandomQuestion(difficulty);
      console.log("results are:", result);
      return res.status(200).json({ message: result });
    } catch (err) {
      console.log("This ain't it man");
      console.log(err);
    }
  }
}
