import 'reflect-metadata';
import { createConnection } from 'typeorm';

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import { Contact } from './entitys/contact';

import { logger } from './utils/logger/logger';

import routes from './routes';

createConnection().then(async connection => {

  const app = express();

  // logger.info('Express was successfully initialised');

  //
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

  //
  // https://expressjs.com/en/advanced/best-practice-security.html
  //

  app.use(helmet());

  app.use(bodyParser.json());

  app.use('/api/', routes);

  app.listen(3001, () => {
    console.log('Server started on port 3001, try http://localhost:3001/api/contacts');
  });

  // @ts-ignore
  await connection.manager.save(connection.manager.create(Contact, {

    id: 1,
    displayName: 'Abetz, Senator the Hon Eric',
    title: 'Senator the Hon',
    givenName: 'Eric',
    middleName: '',
    familyName: 'Abetz',
    honorific: '',
    salutation: 'Senator',
    preferredName: 'Eric',
    initials: 'E.',
    gender: 'MALE',
    email: 'eric.abetz@aph.gov.au',
    phoneNumber: '',
    photoUrl: ''

  }));


  // @ts-ignore
  await connection.manager.save(connection.manager.create(Contact, {

    id: 2,
    displayName: 'Anning, Senator Fraser',
    title: 'Senator',
    givenName: 'Fraser',
    middleName: '',
    familyName: 'Anning',
    honorific: '',
    salutation: 'Senator',
    preferredName: 'Fraser',
    initials: 'F.',
    gender: 'MALE',
    email: 'fraser.anning@aph.gov.au',
    phoneNumber: '',
    photoUrl: ''

  }));

}).catch(error => { logger.error(error); });

// const contact = new Contact();
// contact.displayName = 'Abetz, Senator the Hon Eric';
// await connection.manager.save(connection.manager.create(contact));
