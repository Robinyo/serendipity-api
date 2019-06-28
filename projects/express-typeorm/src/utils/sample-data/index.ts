import axios from 'axios';

import { Address } from '../../entitys/address';
import { Contact } from '../../entitys/contact';
import { Organisation } from '../../entitys/organisation';

import { logger } from '../logger/logger';

class SampleData {

  // private readonly URL = 'assets/data/contacts.json';

  static load = async (connection: any, url: string) => {

    try {

      axios.defaults.baseURL = 'http://localhost:3001';

      const response = await axios.get(url);
      const partys = response.data;

      // logger.info('contacts: ' + JSON.stringify(contacts));

      for (const party of partys) {

        const organisation = new Organisation();
        organisation.name = party.organisation.name;
        organisation.phoneNumber = party.organisation.phoneNumber;

        // cascade: true
        // await connection.manager.save(organisation);

        const address = new Address();
        address.line1 = party.address.line1;
        address.line2 = party.address.line2;
        address.city = party.address.city;
        address.state = party.address.state;
        address.postalCode = party.address.postalCode;

        // cascade: true
        // await connection.manager.save(address);

        const contact = connection.manager.create(Contact, party);
        contact.organisation = organisation;
        contact.address = address;

        await connection.manager.save(contact);

      }

    } catch (error) {

      logger.error(error);
    }

  }

}

export default SampleData;

// https://github.com/axios/axios

// https://www.valentinog.com/blog/http-requests-node-js-async-await/
// https://stackoverflow.com/questions/50277504/is-there-any-reasons-to-use-axios-instead-es6-fetch

// https://github.com/typestack/class-transformer
// Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors
