import axios from 'axios';

import csvtojson from 'csvtojson';

import { createConnection } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { Address } from '../../../api/models/address';
import { Individual } from '../../../api/models/individual';
import { Role } from '../../../api/models/role';

import { createAustralianGreens } from './australian-greens';
import { createAustralianLaborParty } from './australian-labor-party';
import { createCentreAlliance } from './centre-alliance';
import { createJacquiLambieNetwork } from './jacqui-lambie-network';
import { createLiberalPartyOfAustralia } from './liberal-party-of-australia';
import { createNationalPartyOfAustralia } from './national-party-of-australia';
import { createPaulineHansonsOneNation } from './pauline-hansons-one-nation';

import { logger } from '../../../lib/logger';
import { config } from '../../../config/config';

const AUSTRALIAN_GREENS = 'AG';
const AUSTRALIAN_LABOR_PARTY = 'ALP';
const CENTRE_ALLIANCE = 'CA';
const JACQUI_LAMBIE_NETWORK = 'JLN';
const LIBERAL_PARTY_OF_AUSTRALIA = 'LP';
const NATIONAL_PARTY_OF_AUSTRALIA = 'NATS';
const PAULINE_HANSONS_ONE_NATION = 'PHON';

const URL = 'public/data/allsenel.csv';

const politicalParties = [];

async function createPoliticalParties(connection) {

  politicalParties[AUSTRALIAN_GREENS] = await createAustralianGreens(connection);
  politicalParties[AUSTRALIAN_LABOR_PARTY] = await createAustralianLaborParty(connection);
  politicalParties[CENTRE_ALLIANCE] = await createCentreAlliance(connection);
  politicalParties[JACQUI_LAMBIE_NETWORK] = await createJacquiLambieNetwork(connection);
  politicalParties[LIBERAL_PARTY_OF_AUSTRALIA] = await createLiberalPartyOfAustralia(connection);
  politicalParties[NATIONAL_PARTY_OF_AUSTRALIA] = await createNationalPartyOfAustralia(connection);
  politicalParties[PAULINE_HANSONS_ONE_NATION] = await createPaulineHansonsOneNation(connection);

}

(function () {

  createConnection().then(async (connection) => {

    logger.info('Loading sample data ...');

    try {

      await createPoliticalParties(connection);

      //
      // primaryGeneratedColumnId
      //

      const primaryGeneratedColumnId = politicalParties[PAULINE_HANSONS_ONE_NATION].id + 1;

      //
      // Parliament House Address
      //

      const parliamentHouse = new Address(
          'The Senate',
          'PO Box 6100 Parliament House',
          '',
          'Canberra',
          'ACT',
          '2600',
          'Australia',
          'Parliament House'
      );

      await connection.manager.save(parliamentHouse);

      //
      // baseUrl: if you specify a base URL, it’ll be prepended to any relative URL you use
      //

      // axios.defaults.baseURL = 'http://127.0.0.1:3001';
      axios.defaults.baseURL = config.get('protocol') + '://' + config.get('ip') + ':' + config.get('port');
      axios.defaults.responseType = 'stream';

      logger.info('baseURL: ' + axios.defaults.baseURL);

      const response = await axios.get(URL);

      const stream = response.data;

      const converter = csvtojson({
        output: 'json',
        delimiter: ',',
        ignoreEmpty: true,
        noheader: false,
        trim: true,
      });

      converter.fromStream(stream).subscribe((object: any, index: number) => {

        object['party'] = {
          'id': primaryGeneratedColumnId + index,
          'type': 'Individual',
          'displayName': object['Surname'] + ', ' + object['Title'] + ' ' + object['First Name'],

          'addresses': [],
          /*
          'addresses': [
            {
              'line1': object['Electorate Address Line 1'] ? object['Electorate Address Line 1'] : 'Line 1',
              'line2': object['Electorate Address Line 2'] ? object['Electorate Address Line 2'] : 'Line 2',
              'city': object['Electorate Suburb'] ? object['Electorate Suburb'] : 'Suburb',
              'state': object['Electorate State'].toUpperCase() ? object['Electorate State'].toUpperCase() : 'ACT',
              'postalCode': object['Electorate PostCode'] ? object['Electorate PostCode'] : '2600',
              'country': 'Australia',
              'addressType': 'Electorate Office'
            }
          ],
          */

          'roles': []
        };

        const email = object['email'] = object['First Name'].toLowerCase() + '.' +
            object['Surname'].toLowerCase() + '@aph.gov.au';

        const gender = object['Gender'].charAt(0).toUpperCase() + object['Gender'].substr(1).toLowerCase();

        object['title'] = object['Title'] ? object['Title'] : 'Senator';
        object['givenName'] = object['First Name'];
        object['middleName'] = object['Other Name'] ? object['Other Name'] : '';
        object['familyName'] = object['Surname'];
        // object['honorific'] = object['Honorific'] ? object['Honorific'] : '';
        object['honorific'] = object['Post Nominals'] ? object['Post Nominals'] : '';
        object['salutation'] = object['Salutation'] ? object['Salutation'] : 'Senator';
        object['preferredName'] = object['Preferred Name'] ? object['Preferred Name'] : '';
        object['initials'] = object['Initials'];
        object['gender'] = gender;
        object['email'] = email;
        object['phoneNumber'] = object['Electorate Telephone'] ? object['Electorate Telephone'] : '';
        object['photoUrl'] = '';

        const role = {
          role: 'Member',
          partyId: object.party.id,
          partyType: object.party.type,
          partyName: object.party.displayName,
          partyEmail: object.email,
          partyPhoneNumber: object.phoneNumber,
          relationship: 'Membership',
          reciprocalRole: 'Organisation',
          reciprocalPartyId: null,
          reciprocalPartyType: 'Organisation',
          reciprocalPartyName: '',
          reciprocalPartyEmail: '',
          reciprocalPartyPhoneNumber: ''
        };

        let membership = true;

        const politicalParty: string = object['Political Party'].toUpperCase();

        switch (politicalParty) {

          case AUSTRALIAN_GREENS:
          case AUSTRALIAN_LABOR_PARTY:
          case CENTRE_ALLIANCE:
          case JACQUI_LAMBIE_NETWORK:
          case LIBERAL_PARTY_OF_AUSTRALIA:
          case NATIONAL_PARTY_OF_AUSTRALIA:
          case PAULINE_HANSONS_ONE_NATION:

            logger.info('Political Party: ' +  politicalParty);

            // logger.info('politicalParties: ' + JSON.stringify(politicalParties[politicalParty], null, 2) + '\n');

            role.reciprocalPartyId = politicalParties[politicalParty].id;
            role.reciprocalPartyName = politicalParties[politicalParty].name;
            role.reciprocalPartyEmail = politicalParties[politicalParty].email;
            role.reciprocalPartyPhoneNumber = politicalParties[politicalParty].phoneNumber;

            break;

          default:

            logger.error('Political Party: ' +  politicalParty);

            membership = false;
            break;
        }

        //
        // Delete any unwanted properties
        //

        const columnNames = [
          'Title',
          'Salutation',
          'Surname',
          'First Name',
          'Other Name',
          'Preferred Name',
          'Initials',
          'Post Nominals',
          'State',
          'Political Party',
          'Gender',
          // 'Honorific',
          'Electorate Address Line 1',
          'Electorate Address Line 2',
          'Electorate Suburb',
          'Electorate State',
          'Electorate PostCode',
          'Electorate Telephone',
          'Electorate Fax',
          'Electorate TollFree',
          'Label Address',
          'Label Suburb',
          'Label State',
          'Label postcode',
          'Parliamentary Titles'
        ];

        columnNames.forEach((columnName) => {
          object[columnName] = undefined;
        });

        const individual = plainToClass(Individual, object as Object);

        individual.party.addresses.push(parliamentHouse);

        if (membership) {
          individual.party.roles.push(<Role>role);
        }

        connection.manager.save(individual).then(() => {

          // logger.info('individual: ' + JSON.stringify(individual, null, 2) + '\n');

          return new Promise((resolve) => {
            resolve(object);
          });

        });

      }).on('done', () => {

        logger.info('Loading sample data complete!');
      })

    } catch (error) {

      logger.error(error);
    }

  }).catch(error => { logger.error(error); });

})();

// https://developer.mozilla.org/en-US/docs/Glossary/IIFE

// https://github.com/axios/axios
// https://github.com/Keyang/node-csvtojson

// https://www.valentinog.com/blog/http-requests-node-js-async-await/
// https://stackoverflow.com/questions/50277504/is-there-any-reasons-to-use-axios-instead-es6-fetch

// https://github.com/typestack/class-transformer
// Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors

// https://github.com/typeorm/typeorm/issues/3444
// Hydration of Embedded (json) types into proper class instances

// logger.info('items: ' + JSON.stringify(items, null, 2) + '\n' );

// https://stackoverflow.com/questions/208105/how-do-i-remove-a-property-from-a-javascript-object
