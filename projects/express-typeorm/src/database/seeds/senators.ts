import axios from 'axios';

import csvtojson from 'csvtojson';

import { createConnection } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { Address } from '../../api/models/address';
import { Individual } from '../../api/models/individual';
import { Organisation } from '../../api/models/organisation';
import { Party } from '../../api/models/party';
import { Role } from '../../api/models/role';

import { logger } from '../../lib/logger';
import { config } from '../../config/config';

const AUSTRALIAN_GREENS = 'AG';
const CENTRE_ALLIANCE = 'CA';
const JACQUI_LAMBIE_NETWORK = 'JLN';
const LABOR_PARTY = 'ALP';
const LIBERAL_PARTY = 'LP';
const NATIONAL_AUSTRALIA_PARTY = 'NATS';
const PAULINE_HANSONS_ONE_NATION = 'PHON';

const URL = 'public/data/allsenel.csv';

// https://developer.mozilla.org/en-US/docs/Glossary/IIFE

(function () {

  createConnection().then(async (connection) => {

    logger.info('Loading sample data...');

    try {

      //
      // Australian Greens
      //

      const greens = new Party();
      greens.type = 'Organisation';
      greens.displayName = 'Greens';

      const greensOrg = new Organisation();
      greensOrg.name = 'Australian Greens';
      greensOrg.phoneNumber = '(02) 9999 9999';

      greensOrg.party = greens;

      await connection.manager.save(greensOrg);

      //
      // Centre Alliance
      //

      const ca = new Party();
      ca.type = 'Organisation';
      ca.displayName = 'Centre Alliance';

      const caOrg = new Organisation();
      caOrg.name = 'Centre Alliance';
      caOrg.phoneNumber = '(02) 9999 9999';

      caOrg.party = ca;

      await connection.manager.save(caOrg);

      //
      // Jacqui Lambie Network
      //

      const jln = new Party();
      jln.type = 'Organisation';
      jln.displayName = 'Jacqui Lambie Network';

      const jlnOrg = new Organisation();
      jlnOrg.name = 'Jacqui Lambie Network';
      jlnOrg.phoneNumber = '(02) 9999 9999';

      jlnOrg.party = jln;

      await connection.manager.save(jlnOrg);

      //
      // Labor Party
      //

      const labor = new Party();
      labor.type = 'Organisation';
      labor.displayName = 'Labor Party';

      const laborOrg = new Organisation();
      laborOrg.name = 'Australian Labor Party';
      laborOrg.phoneNumber = '(02) 9999 9999';

      laborOrg.party = labor;

      await connection.manager.save(laborOrg);

      //
      // Liberal Party
      //

      const liberal = new Party();
      liberal.type = 'Organisation';
      liberal.displayName = 'Liberal Party';

      const liberalOrg = new Organisation();
      liberalOrg.name = 'Liberal Party of Australia';
      liberalOrg.phoneNumber = '(02) 9999 9999';

      liberalOrg.party = liberal;

      await connection.manager.save(liberalOrg);

      //
      // National Party
      //

      const national = new Party();
      national.type = 'Organisation';
      national.displayName = 'National Party';

      const nationalOrg = new Organisation();
      nationalOrg.name = 'National Party of Australia';
      nationalOrg.phoneNumber = '(02) 9999 9999';

      nationalOrg.party = national;

      await connection.manager.save(nationalOrg);

      //
      // Pauline Hanson's One Nation
      //

      const phon = new Party();
      phon.type = 'Organisation';
      phon.displayName = 'One Nation';

      const phonOrg = new Organisation();
      phonOrg.name = 'Pauline Hanson\'s One Nation';
      phonOrg.phoneNumber = '(02) 9999 9999';

      phonOrg.party = phon;

      await connection.manager.save(phonOrg);

      //
      // primaryGeneratedColumnId
      //

      const primaryGeneratedColumnId: number = liberalOrg.id + 1;

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
          relationship: 'Membership',
          reciprocalRole: 'Organisation',
          reciprocalPartyId: null,
          reciprocalPartyType: 'Organisation',
          reciprocalPartyName: ''
        };

        let membership = true;
        const politicalParty: string = object['Political Party'].toUpperCase();

        switch (politicalParty) {

          case AUSTRALIAN_GREENS:

            logger.info(AUSTRALIAN_GREENS);
            role.reciprocalPartyId = greensOrg.id;
            role.reciprocalPartyName = greensOrg.name;

            break;

          case CENTRE_ALLIANCE:

            logger.info(CENTRE_ALLIANCE);
            role.reciprocalPartyId = caOrg.id;
            role.reciprocalPartyName = caOrg.name;

            break;

          case JACQUI_LAMBIE_NETWORK:

            logger.info(JACQUI_LAMBIE_NETWORK);
            role.reciprocalPartyId = jlnOrg.id;
            role.reciprocalPartyName = jlnOrg.name;

            break;

          case LABOR_PARTY:

            logger.info(LABOR_PARTY);
            role.reciprocalPartyId = laborOrg.id;
            role.reciprocalPartyName = laborOrg.name;

            break;

          case LIBERAL_PARTY:

            logger.info(LIBERAL_PARTY);
            role.reciprocalPartyId = liberalOrg.id;
            role.reciprocalPartyName = liberalOrg.name;

            break;

          case NATIONAL_AUSTRALIA_PARTY:

            logger.info(NATIONAL_AUSTRALIA_PARTY);
            role.reciprocalPartyId = nationalOrg.id;
            role.reciprocalPartyName = nationalOrg.name;

            break;

          case PAULINE_HANSONS_ONE_NATION:

            logger.info(PAULINE_HANSONS_ONE_NATION);
            role.reciprocalPartyId = phonOrg.id;
            role.reciprocalPartyName = phonOrg.name;

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

        const individual = plainToClass(Individual, object);

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

        logger.info('Loading complete!');
      })

    } catch (error) {

      logger.error(error);
    }

  }).catch(error => { logger.error(error); });

})();

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
