import { createConnection } from 'typeorm';
import { plainToClass } from 'class-transformer';

import * as faker from 'faker';

import { Address } from '../../api/models/address';
import { Individual } from '../../api/models/individual';

import { logger } from '../../lib/logger';

// https://developer.mozilla.org/en-US/docs/Glossary/IIFE

(function () {

  createConnection().then(async connection => {

    logger.info('Seed the database with some sample data ...');

    try {

      let item;
      let givenName;
      let familyName;
      let email;
      let phoneNumber;

      let address;

      for (let i = 1; i <= 100; i++) {

        givenName = faker.name.firstName();
        familyName = faker.name.lastName();
        email = faker.internet.email();
        phoneNumber = faker.phone.phoneNumber();

        item = {
          party: {
            type: 'Individual',
            displayName: familyName + ', ' + givenName,
            addresses: [],
            roles: []
          },
          title: '',
          givenName: givenName,
          middleName: '',
          familyName: familyName,
          honorific: '',
          salutation: '',
          preferredName: givenName,
          initials: '',
          gender: '',
          email: email,
          phoneNumber: phoneNumber,
          photoUrl: ''
        };

        /*

        const parliamentHouse = new Address(
          'The Senate',
          'PO Box 6100 Parliament House',
          'Canberra',
          'ACT',
          '2600',
          'Australia',
          'Parliament House'
        );

        */

        address = new Address(
            faker.address.streetName(),
            faker.address.streetAddress(),
            faker.address.county(),
            faker.address.state(),
            faker.address.zipCode(),
            faker.address.country(),
            'Principle Place of Residence'
        );

        item.party.addresses.push(address);

        // logger.info('individual: ' + JSON.stringify(item, null, 2) + '\n');

        const individual = plainToClass(Individual, item);

        await connection.manager.save(individual);

      }

    } catch (error) {

      logger.error(error);
    }

  }).catch(error => { logger.error(error); });

})();

// https://github.com/axios/axios

// https://www.valentinog.com/blog/http-requests-node-js-async-await/
// https://stackoverflow.com/questions/50277504/is-there-any-reasons-to-use-axios-instead-es6-fetch

// https://github.com/typestack/class-transformer
// Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors

// https://github.com/typeorm/typeorm/issues/3444
// Hydration of Embedded (json) types into proper class instances

// logger.info('items: ' + JSON.stringify(items, null, 2) + '\n' );
