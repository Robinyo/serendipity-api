import 'reflect-metadata';

import bodyParser from 'body-parser';
import cors from 'cors';
import chalk from 'chalk';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

import { createConnection } from 'typeorm';

import { Controller } from './api/interfaces/controller.interface';

import { Policy } from './api/utils/policy';
import { SampleData } from './utils/sample-data/index-2';

import { config } from './config/config';
import { logger } from './lib/logger';

export class App {

  public app: express.Application;

  constructor(controllers: Controller[]) {

    this.app = express();

    this.initialiseMiddleware();
    this.initialiseStaticRoutes();
    this.initialiseControllers(controllers);
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

  private initialiseStaticRoutes() {

    this.app.use('/public', express.static(path.join(__dirname, 'public')));
    this.app.use('/docs', express.static(path.join(__dirname, 'docs')));
  }

  private initialiseControllers(controllers: Controller[]) {

    controllers.forEach((controller) => {
      this.app.use('/api/', controller.getRoutes());
    });

  }

}

// export default App;
