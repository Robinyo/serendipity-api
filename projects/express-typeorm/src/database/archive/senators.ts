import axios from 'axios';

import { plainToClass } from 'class-transformer';

import { Individual } from '../../api/models/individual';

import { logger } from '../../lib/logger';
import { config } from '../../config/config';

export class Senators {

  static load = async (connection: any, url: string) => {

    logger.info('Senators load()');

    try {

      // axios.defaults.baseURL = 'http://127.0.0.1:3001';
      axios.defaults.baseURL = config.get('protocol') + '://' + config.get('ip') + ':' + config.get('port');

      logger.info('Senators load() baseURL: ' + axios.defaults.baseURL);

      const response = await axios.get(url);
      const items = response.data;

      // logger.info('items: ' + JSON.stringify(items, null, 2) + '\n' );

      for (const item of items) {

        const individual = plainToClass(Individual, item);

        // logger.info('individual: ' + JSON.stringify(individual, null, 2) + '\n');

        await connection.manager.save(individual);
      }

    } catch (error) {

      logger.error(error);
    }

  };

}

// export default SampleData;

// https://github.com/axios/axios

// https://www.valentinog.com/blog/http-requests-node-js-async-await/
// https://stackoverflow.com/questions/50277504/is-there-any-reasons-to-use-axios-instead-es6-fetch

// https://github.com/typestack/class-transformer
// Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors

// https://github.com/typeorm/typeorm/issues/3444
// Hydration of Embedded (json) types into proper class instances

/*

const ELECTORATE_OFFICE = 'Electorate Office';
const PARLIAMENT_HOUSE = 'Parliament House';


      const electorateOffice = new AddressType();
      electorateOffice.name = ELECTORATE_OFFICE;
      electorateOffice.description = 'The address at which a Senator receives electorate-related letters or packages.';

      await connection.manager.save(electorateOffice);

      const parliamentHouse = new AddressType();
      parliamentHouse.name = PARLIAMENT_HOUSE;
      parliamentHouse.description = 'The address at which a Senator receives formal correspondence.';

      await connection.manager.save(parliamentHouse);

          if (address.addressType.name === ELECTORATE_OFFICE) {
            address.addressType = electorateOffice;
          } else {
            address.addressType = parliamentHouse;
          }

// import { Address } from '../../api/models/address';

        const addresses: Address[] = [];

        for (const nestedItem of individual.addresses) {

          const address = plainToClass(Address, nestedItem);

          logger.info('address: ' + JSON.stringify(address, null, 2) + '\n');

          // logger.info('addressType: ' + JSON.stringify(address, null, 2) + '\n');

          addresses.push(address);

          await connection.manager.save(address);

        }

        individual.addresses = addresses;

*/
