import { Contact } from '../../entitys/contact';

// import { logger } from '../../utils/logger/logger';

class SampleData {

  static load = async(connection: any) => {

    // @ts-ignore
    await connection.manager.save(connection.manager.create(Contact, {

      // id: 1,
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

    // @ts-ignore
    await connection.manager.save(connection.manager.create(Contact, {

      // id: 2,
      displayName: 'Anning, Senator Fraser',
      title: 'Senator',
      givenName: 'Fraser',
      middleName: '',
      familyName: 'Anning',
      honorific: '',
      salutation: 'Senator',
      preferredName: 'Fraser',
      initials: 'F.',
      gender: 'MALE',
      email: 'fraser.anning@aph.gov.au',
      phoneNumber: '',
      photoUrl: ''

    }));

  }

}

export default SampleData;

/*

{
  "displayName":"Abetz, Senator the Hon Eric",
  "title":"Senator the Hon",
  "givenName":"Eric",
  "middleName":"",
  "familyName":"Abetz",
  "honorific":"",
  "salutation":"Senator",
  "preferredName":"Eric",
  "initials":"E.",
  "gender":"MALE",
  "email":"eric.abetz@aph.gov.au",
  "phoneNumber":"",
  "photoUrl":""
}

{
  "displayName":"Anning, Senator Fraser",
  "title":"Senator",
  "givenName":"Fraser",
  "middleName":"",
  "familyName":"Anning",
  "honorific":"",
  "salutation":"Senator",
  "preferredName":"Fraser",
  "initials":"F.",
  "gender":"MALE",
  "email":"fraser.anning@aph.gov.au",
  "phoneNumber":"",
  "photoUrl":""
}

*/

// const contact = new Contact();
// contact.displayName = 'Abetz, Senator the Hon Eric';
// await connection.manager.save(connection.manager.create(contact));
