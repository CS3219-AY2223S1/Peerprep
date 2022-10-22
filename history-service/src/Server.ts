import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import express from 'express';
import cors from 'cors';
import SessionCtrl from './controllers/SessionCtrl';
// import cookieParser from 'cookie-parser';
// import methodOverride from 'method-override';

@Configuration({
  acceptMimes: ['application/json'],
  port: process.env.PORT || 8004,
  mount: { '/api': [SessionCtrl] },
  })
export default class Server {
  @Inject()
    app!: PlatformApplication;

  @Configuration()
    settings!: Configuration;

  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $beforeRoutesInit(): void | Promise<any> {
    this.app!
      .use(express.urlencoded({ extended: true }))
      .use(express.json())
      .use(cors()) // config cors so that front-end can use
      .options('*', cors());
  }
}
