import { config } from '../../config/config';

import axios from 'axios';

import { Address } from '../../api/models/address';
import { Individual } from '../../api/models/individual';
import { Organisation } from '../../api/models/organisation';

import { logger } from '../../lib/logger';

class SampleData {

  static load = async (connection: any, url: string) => {

    logger.info('SampleData load()');

    try {

      // axios.defaults.baseURL = 'http://127.0.0.1:3001';
      axios.defaults.baseURL = config.get('protocol') + '://' + config.get('ip') + ':' + config.get('port');

      logger.info('SampleData load() baseURL: ' + axios.defaults.baseURL);

      const response = await axios.get(url);
      const items = response.data;

      // logger.info('items: ' + JSON.stringify(items));

      for (const item of items) {

        const organisation = new Organisation();
        organisation.name = item.organisation.name;
        organisation.phoneNumber = item.organisation.phoneNumber;

        // cascade: true
        // await connection.manager.save(organisation);

        const address = new Address();
        address.line1 = item.address.line1;
        address.line2 = item.address.line2;
        address.city = item.address.city;
        address.state = item.address.state;
        address.postalCode = item.address.postalCode;

        // cascade: true
        // await connection.manager.save(address);

        const contact = connection.manager.create(Individual, item);
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
