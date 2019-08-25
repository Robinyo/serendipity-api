import axios from 'axios';

import { plainToClass } from 'class-transformer';

import { Address } from '../../api/models/address';
import { Individual } from '../../api/models/individual';
// import { Location } from '../../api/models/location';
import { Organisation } from '../../api/models/organisation';
import { Party } from '../../api/models/party';
import { Role } from '../../api/models/role';

import { logger } from '../../lib/logger';
import { config } from '../../config/config';

const LIBERAL = 'Liberal Party';
const LABOR = 'Labor Party';

export class Senators {

  static load = async (connection: any, url: string) => {

    logger.info('Senators load()');

    try {

      //
      // Liberal Party
      //

      const liberal = new Party();
      liberal.partyType = 'Organisation';
      liberal.displayName = 'Liberal Party';

      const liberalOrg = new Organisation();
      liberalOrg.name = 'Liberal Party of Australia';
      liberalOrg.phoneNumber = '(03) 6224 3707';

      liberalOrg.party = liberal;

      await connection.manager.save(liberalOrg);

      //
      // Labor Party
      //

      const labor = new Party();
      labor.partyType = 'Organisation';
      labor.displayName = 'Labor Party';

      const laborOrg = new Organisation();
      laborOrg.name = 'Australian Labor Party';
      laborOrg.phoneNumber = '(03) 9890 7022';

      laborOrg.party = labor;

      await connection.manager.save(laborOrg);

      //
      // Parliament House Address
      //

      const parliamentHouse = new Address(
        'The Senate',
        'PO Box 6100 Parliament House',
        'Canberra',
        'ACT',
        '2600',
        'Australia',
        'Parliament House'
      );

      await connection.manager.save(parliamentHouse);

      // axios.defaults.baseURL = 'http://127.0.0.1:3001';
      axios.defaults.baseURL = config.get('protocol') + '://' + config.get('ip') + ':' + config.get('port');

      logger.info('Senators load() baseURL: ' + axios.defaults.baseURL);

      const response = await axios.get(url);
      const items = response.data;

      //
      // For each Senator ...
      //

      for (const item of items) {

        const individual = plainToClass(Individual, item);

        individual.party.addresses.push(parliamentHouse);

        let role: Role;

        if (individual.party.roles.length) {

          role = individual.party.roles[0];

          individual.party.roles = [];
        }

        await connection.manager.save(individual);

        //
        // Create a 'relationship' from the Senator to a Political Party
        //

        /*

        "roles": [
          {
            "role": "Member",
            "partyType": "Individual",
            "partyName": "Abetz, Senator the Hon Eric",
            "relationship": "Membership",
            "reciprocalRole": "Organisation",
            "reciprocalPartyType": "Organisation",
            "reciprocalPartyName": "Liberal Party"
          }
        ]

        */

        if (role) {

          // role.partyId = individual.party.id;
          role.partyId = individual.id;

          switch (role.reciprocalPartyName) {

            case LIBERAL:

              logger.info(LIBERAL);
              // role.reciprocalPartyId = liberalOrg.party.id;
              role.reciprocalPartyId = liberalOrg.id;

              break;

            case LABOR:

              logger.info(LABOR);
              // role.reciprocalPartyId = laborOrg.party.id;
              role.reciprocalPartyId = laborOrg.id;

              break;

            default:

              logger.error('role.reciprocalPartyName: default');
              break;
          }

          individual.party.roles.push(role);

        }

        logger.info('individual: ' + JSON.stringify(individual, null, 2) + '\n');

        await connection.manager.save(individual);
      }

    } catch (error) {

      logger.error(error);
    }

  };

}

// export default Senators;

// https://github.com/axios/axios

// https://www.valentinog.com/blog/http-requests-node-js-async-await/
// https://stackoverflow.com/questions/50277504/is-there-any-reasons-to-use-axios-instead-es6-fetch

// https://github.com/typestack/class-transformer
// Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors

// https://github.com/typeorm/typeorm/issues/3444
// Hydration of Embedded (json) types into proper class instances

// logger.info('items: ' + JSON.stringify(items, null, 2) + '\n' );
