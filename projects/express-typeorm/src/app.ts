import bodyParser from 'body-parser';
import cors from 'cors';
import chalk from 'chalk';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

import { createConnection } from 'typeorm';

import { Controller } from './api/controllers/controller';
import { IndividualControllerFactory } from './api/controllers/individual/individual.controller';

import { Policy } from './api/utils/policy';

import { Senators } from './database/seeds/senators';

import { config } from './config/config';
import { logger } from './lib/logger';

export class App {

  public app: express.Application;

  private controllers: Controller[] = [];

  constructor() {

    this.controllers = this.controllers.concat(IndividualControllerFactory());

    this.app = express();

    this.initialiseMiddleware();
    this.initialiseRoutes(this.controllers);
  }

  public listen() {

    createConnection().then(async connection => {

      this.app.listen(config.get('port'), () => {

        console.log(chalk.blueBright('Server started on port ' + config.get('port')  + ' try ') +
            chalk.blueBright.underline('http://' + config.get('ip') + ':' + config.get('port') + '/docs'));

        //
        // TODO: Use a Database Migration
        // See: http://typeorm.io/#/migrations
        //

        Senators.load(connection, 'public/data/senators.json');

        //
        // Load Policy config (e.g., routes, methods and required roles)
        //

        Policy.load();

        console.log('\nPress CTRL-C to stop');

      });

    }).catch(error => { logger.error(error); });

  }

  private initialiseMiddleware() {

    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
  }

  private initialiseRoutes(controllers: Controller[]) {

    this.initialiseStaticRoutes();

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
