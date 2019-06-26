import 'reflect-metadata';
import { createConnection } from 'typeorm';

import express from 'express';
import bodyParser from 'body-parser';
// import * as helmet from 'helmet';
// import * as cors from 'cors';

import { Contact } from './entitys/contact';

import { logger } from './utils/logger';

import routes from './routes';

createConnection().then(async connection => {

  logger.info('Express initialised');

  const app = express();

  // app.use(cors());
  // app.use(helmet());
  app.use(bodyParser.json());

  app.use('/', routes);

  app.listen(3001, () => {
    console.log('Server started on port 3001');
  });

  // const contact = new Contact();
  // contact.displayName = 'Abetz, Senator the Hon Eric';
  // await connection.manager.save(connection.manager.create(contact));

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

}).catch(error => { logger.error(error); });
