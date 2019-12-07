import { Address } from '../../../api/models/address';
import { Individual } from '../../../api/models/individual';
import { Organisation } from '../../../api/models/organisation';
import { Role } from '../../../api/models/role';

import { logger } from '../../../lib/logger';

export async function createAustralianGreens(connection) {

  logger.info('Create Australian Greens ...');

  // Address

  const address = new Address(
      '',
      '23/85 Northbourne Ave',
      '',
      'Turner',
      'ACT',
      '2612',
      'Australia',
      'Principle Place of Business'
  );

  await connection.manager.save(address);

  // Primary Contact (Individual)

  const primaryContact = new Individual('Jordan', 'Hull', 'jordan.hull@greens.org.au', '(02) 6140 3220');

  primaryContact.party['addresses'] = [];
  primaryContact.party['roles'] = [];

  primaryContact.party.addresses.push(address);

  await connection.manager.save(primaryContact);

  // Organisation

  const primaryGeneratedColumnId = primaryContact.party.id + 1;

  const organisation = new Organisation('Australian Greens', 'greens@greens.org.au', '(02) 6140 3220');

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

  logger.info('Create Australian Greens complete!');

  return organisation;

}
