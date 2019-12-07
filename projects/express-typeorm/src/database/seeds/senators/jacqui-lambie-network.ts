import { Address } from '../../../api/models/address';
import { Individual } from '../../../api/models/individual';
import { Organisation } from '../../../api/models/organisation';
import { Role } from '../../../api/models/role';

import { logger } from '../../../lib/logger';

export async function createJacquiLambieNetwork(connection) {

  logger.info('Create Jacqui Lambie Network ...');

  // Address

  const address = new Address(
      '',
      'Shop 4',
      '22 Mount Street',
      'Burnie',
      'TAS',
      '7320',
      'Australia',
      'Principle Place of Business'
  );

  await connection.manager.save(address);

  // Primary Contact (Individual)

  const primaryContact = new Individual('Glynn', 'Williams', 'glynn.williams@lambienetwork.com.au', '(03) 6431 3112');

  primaryContact.party['addresses'] = [];
  primaryContact.party['roles'] = [];

  primaryContact.party.addresses.push(address);

  await connection.manager.save(primaryContact);

  // Organisation

  const primaryGeneratedColumnId = primaryContact.party.id + 1;

  const organisation = new Organisation('Jacqui Lambie Network', 'hey@lambienetwork.com.au', '(03) 6431 3112');

  organisation.party.id = primaryGeneratedColumnId;
  organisation.party['addresses'] = [];
  organisation.party['roles'] = [];

  organisation.party.addresses.push(address);

  // Organisation, Role -> Primary Contact

  organisation.party.roles.push(new Role(
      'Organisation',
      organisation.party.id,
      organisation.party.type,
      organisation.party.displayName,
      organisation.email,
      organisation.phoneNumber,
      'Primary Contact',
      'Member',
      primaryContact.party.id,
      primaryContact.party.type,
      primaryContact.party.displayName,
      primaryContact.email,
      primaryContact.phoneNumber,
  ));

  await connection.manager.save(organisation);

  // Primary Contact, Role -> Membership

  primaryContact.party.roles.push(new Role(
      'Member',
      primaryContact.party.id,
      primaryContact.party.type,
      primaryContact.party.displayName,
      primaryContact.email,
      primaryContact.phoneNumber,
      'Membership',
      'Organisation',
      organisation.party.id,
      organisation.party.type,
      organisation.party.displayName,
      organisation.email,
      organisation.phoneNumber,
  ));

  await connection.manager.save(primaryContact);

  logger.info('Create Jacqui Lambie Network complete!');

  return organisation;

}
