import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import express from 'express';
import cors from 'cors';
import QuestionCtrl from './controllers/QuestionCtrl';

@Configuration({
  acceptMimes: ['application/json'],
  port: process.env.PORT || 8003,
  mount: { '/questions': [QuestionCtrl] },
})
export default class QuestionServer {
  @Inject()
    app!: PlatformApplication;

  @Configuration()
    settings!: Configuration;

  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {QuestionServer}
   */
  public $beforeRoutesInit(): void | Promise<any> {
    this.app!
      .use(express.urlencoded({ extended: true }))
      .use(express.json())
      .use(cors()) // config cors so that front-end can use
      .options('*', cors());
  }
}
