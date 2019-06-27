import 'reflect-metadata';
import { createConnection } from 'typeorm';

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import SampleData from './utils/sample-data';

import { logger } from './utils/logger/logger';

import routes from './routes';

createConnection().then(async connection => {

  const app = express();

  // logger.info('Express was successfully initialised');

  //
  // https://expressjs.com/en/advanced/best-practice-security.html
  // https://expressjs.com/en/resources/middleware/cors.html
  //

  const whitelist = ['http://localhost', 'https://serendipity.io'];

  const corsOptions = {
    origin: function(origin: any, callback: any) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  };

  // app.use(cors(corsOptions));
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  app.use('/api/', routes);

  SampleData.load(connection);

  app.listen(3001, () => {
    console.log('Server started on port 3001, try http://localhost:3001/api/contacts');
  });

}).catch(error => { logger.error(error); });
