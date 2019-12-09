import bodyParser from 'body-parser';
import cors from 'cors';
import chalk from 'chalk';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

import { createConnection } from 'typeorm';

import { AuthControllerFactory } from './api/controllers/auth/auth.controller';

import { Controller } from './api/controllers/controller';
import { EmailControllerFactory } from './api/controllers/email/email.controller';
import { IndividualControllerFactory } from './api/controllers/individual/individual.controller';
import { OrganisationControllerFactory } from './api/controllers/organisation/organisation.controller';

import { Policy } from './api/utils/policy';

import { config } from './config/config';
import { logger } from './lib/logger';

export class App {

  public app: express.Application;

  private controllers: Controller[] = [];

  constructor() {

    this.controllers = this.controllers.concat(EmailControllerFactory());
    this.controllers = this.controllers.concat(IndividualControllerFactory());
    this.controllers = this.controllers.concat(OrganisationControllerFactory());

    this.app = express();

    this.initialiseMiddleware();

    this.initialiseStaticRoutes();
    this.initialiseAuthRoutes(AuthControllerFactory());
    this.initialiseApiRoutes(this.controllers);

  }

  public listen() {

    createConnection().then(async connection => {

      this.app.listen(config.get('port'), () => {

        console.log(chalk.blueBright('Server started on port ' + config.get('port')  + ' try ') +
            chalk.blueBright.underline('http://' + config.get('ip') + ':' + config.get('port') + '/docs'));

        //
        // Load Policy config (e.g., routes, methods and required roles)
        //

        Policy.load();

        console.log('\nPress CTRL-C to stop');

      });

    }).catch(error => { logger.error(error); });

  }

  private initialiseMiddleware() {

    //
    // https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
    //
    // By default, only 6 response headers are exposed over CORS:
    // Cache-Control
    // Content-Language
    // Content-Type
    // Expires
    // Last-Modified
    // Pragma

    this.app.use(cors({
        exposedHeaders: ['Location', 'Link'],
        // origin: 'https://serendipity.org.au'
      }
    ));
    this.app.use(helmet());
    this.app.use(bodyParser.json());
  }

  private initialiseAuthRoutes(controllers: Controller[]) {

    controllers.forEach((controller) => {
      this.app.use('/', controller.getRoutes());
    });

  }

  private initialiseApiRoutes(controllers: Controller[]) {

    controllers.forEach((controller) => {
      this.app.use('/api/', controller.getRoutes());
    });

  }

  private initialiseStaticRoutes() {

    this.app.use('/public', express.static(path.join(__dirname, 'public')));
    this.app.use('/docs', express.static(path.join(__dirname, 'docs')));
  }

}

// export default App;

/*

import passport from 'passport';
// import './api/middleware/auth-local';

this.app.use(passport.initialize());

this.router.post(this.path, [passport.authenticate('register', { session : false })], this.execute);

*/

/*

// import { Senators } from './database/seeds/senators';

// Senators.load(connection, 'public/data/senators.json');

import 'reflect-metadata';
import { Injectable, ReflectiveInjector } from 'injection-js';

import {
  FindIndividualController,
  FindOneIndividualController
} from './api/controllers/individual/individual.controller';

// https://github.com/mgechev/injection-js
// https://v4.angular.io/guide/dependency-injection#implicit-injector-creation

const injector = ReflectiveInjector.resolveAndCreate([
  FindIndividualController,
  FindOneIndividualController
]);

const injector = ReflectiveInjector.resolveAndCreate(individualControllers);

  constructor(controllers: Controller[] = [

    // If you need a something, ask the injector to get it for you :)
    injector.get(FindIndividualController),
    injector.get(FindOneIndividualController),

  ])

// import { SampleData } from './utils/sample-data/index-2';
// SampleData.load(connection, 'public/data/contacts.json');

*/
