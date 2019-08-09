import 'reflect-metadata';
import { Injectable, ReflectiveInjector } from 'injection-js';

import bodyParser from 'body-parser';
import cors from 'cors';
import chalk from 'chalk';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

import { createConnection } from 'typeorm';

import { Controller } from './api/controllers/controller';
import {
  FindIndividualController,
  FindOneIndividualController
} from './api/controllers/individual/individual.controller';

import { Policy } from './api/utils/policy';
import { SampleData } from './utils/sample-data/index-2';

import { config } from './config/config';
import { logger } from './lib/logger';

// https://github.com/mgechev/injection-js
// https://v4.angular.io/guide/dependency-injection#implicit-injector-creation

const injector = ReflectiveInjector.resolveAndCreate([FindIndividualController, FindOneIndividualController]);

@Injectable()
export class App {

  public app: express.Application;

  constructor(controllers: Controller[] = [

    // If you need a something, ask the injector to get it for you :)
    injector.get(FindIndividualController),
    injector.get(FindOneIndividualController),

  ]) {

    this.app = express();

    this.initialiseMiddleware();
    this.initialiseRoutes(controllers);
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

        SampleData.load(connection, 'public/data/contacts.json');

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
