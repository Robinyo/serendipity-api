import axios from 'axios';

import { plainToClass } from 'class-transformer';

import { Address } from '../../api/models/address';
import { Individual } from '../../api/models/individual';
import { Organisation } from '../../api/models/organisation';
import { Party } from '../../api/models/party';
// import { Role } from '../../api/models/role';

import { logger } from '../../lib/logger';
import { config } from '../../config/config';

const LIBERAL = 'Liberal';
const LABOR = 'Labor';

export class Senators {

  static load = async (connection: any, url: string) => {

    logger.info('Senators load()');

    try {

      //
      // Liberal Party
      //

      const liberal = new Party();
      liberal.partyType = 'Organisation';
      liberal.displayName = 'Liberal';

      const liberalOrg = new Organisation();
      liberalOrg.name = 'Liberal Party of Australia';
      liberalOrg.phoneNumber = '(03) 6224 3707';

      await connection.manager.save(liberal);

      liberalOrg.id = liberal.id;
      liberalOrg.party = liberal;

      await connection.manager.save(liberalOrg);

      //
      // Labor Party
      //

      const labor = new Party();
      labor.partyType = 'Organisation';
      labor.displayName = 'Labor';

      const laborOrg = new Organisation();
      laborOrg.name = 'Australian Labor Party';
      laborOrg.phoneNumber = '(03) 9890 7022';

      await connection.manager.save(labor);

      laborOrg.id = labor.id;
      laborOrg.party = labor;

      await connection.manager.save(laborOrg);

      //
      // Parliament House Address
      //

      const parliamentHouse = new Address();

      parliamentHouse.line1 = 'The Senate';
      parliamentHouse.line2 = 'PO Box 6100 Parliament House';
      parliamentHouse.city = 'Canberra';
      parliamentHouse.state = 'ACT';
      parliamentHouse.postalCode = '2600';
      parliamentHouse.addressType = 'Parliament House';

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

        //
        // Create a 'relationship' from the Senator to their Political Party
        //

        const party = new Party();
        party.partyType = 'Individual';
        party.displayName = individual.party.displayName;

        await connection.manager.save(party);

        /*

        "roles": [
          {
            "role": "Member",
            "partyName": "Abetz, Senator the Hon Eric",
            "relationship": "Membership",
            "reciprocalRole": "Organisation",
            "reciprocalPartyName": "Liberal"
          }

        */

        party.roles = [].concat(individual.party.roles);
        party.addresses = [].concat(individual.party.addresses);
        individual.party = party;

        individual.id = party.id;

        if (individual.party.roles.length) {

          switch (individual.party.roles[0].reciprocalPartyName) {

            case LIBERAL:

              logger.info(LIBERAL);
              individual.party.roles[0].partyId = individual.id;
              individual.party.roles[0].reciprocalPartyId = liberalOrg.id;

              break;

            case LABOR:

              logger.info(LABOR);
              individual.party.roles[0].partyId = individual.id;
              individual.party.roles[0].reciprocalPartyId = laborOrg.id;

              break;

            default:

              logger.error('individual.party.roles[0].reciprocalPartyName: default');
              break;
          }

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

// See: individual.ts
//
// @BeforeInsert()
// setPrimaryKey() {
//   this.id = this.party.id;
// }
