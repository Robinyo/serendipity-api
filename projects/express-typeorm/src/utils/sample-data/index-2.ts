import axios from 'axios';

import { plainToClass } from 'class-transformer';

import { Individual } from '../../api/models/individual';
import { logger } from '../../lib/logger';
import { config } from '../../config/config';

export class SampleData {

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

        const individual = plainToClass(Individual, item);

        // logger.info('individual: ' + JSON.stringify(individual));

        await connection.manager.save(individual);
      }

    } catch (error) {

      logger.error(error);
    }

  }

}

// export default SampleData;

// https://github.com/axios/axios

// https://www.valentinog.com/blog/http-requests-node-js-async-await/
// https://stackoverflow.com/questions/50277504/is-there-any-reasons-to-use-axios-instead-es6-fetch

// https://github.com/typestack/class-transformer
// Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors

// https://github.com/typeorm/typeorm/issues/3444
// Hydration of Embedded (json) types into proper class instances
