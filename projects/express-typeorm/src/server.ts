import 'reflect-metadata';
import { createConnection } from 'typeorm';

import chalk from 'chalk';
import errorHandler from 'errorhandler';

import { config } from './config/config';
import { app } from './app';

import { logger } from './utils/logger/logger';

import SampleData from './utils/sample-data';

createConnection().then(async connection => {

  //
  // Error Handler. Provides full stack trace - remove for production
  //

  app.use(errorHandler());

  //
  // TODO: Use a Database Migration
  // See: http://typeorm.io/#/migrations
  //

  SampleData.load(connection, 'assets/data/contacts.json');

  const server = app.listen(config.get('port'), () => {

    console.log(chalk.blueBright('Server started on port ' + config.get('port')  + ' try ') +
        chalk.blueBright.underline('http://' + config.get('ip') + ':' + config.get('port') + '/docs'));

    console.log('\nPress CTRL-C to stop');

  });

}).catch(error => { logger.error(error); });

// export default server;
