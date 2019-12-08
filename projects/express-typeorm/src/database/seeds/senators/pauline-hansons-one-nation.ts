import { Address } from '../../../api/models/address';
import { Individual } from '../../../api/models/individual';
import { Organisation } from '../../../api/models/organisation';
import { Role } from '../../../api/models/role';

import { logger } from '../../../lib/logger';

export async function createPaulineHansonsOneNation(connection) {

  logger.info('Create Pauline Hanson\'s One Nation ...');

  // Address

  const address = new Address(
      '',
      'PO Box 136',
      '',
      'Pinkenba',
      'QLD',
      '4008',
      'Australia',
      'Principle Place of Business'
  );

  await connection.manager.save(address);

  // Primary Contact (Individual)

  const primaryContact = new Individual('Rod', 'Miles', 'rod.mills@onenation.org.au', '1300 857 466');

  primaryContact.party['addresses'] = [];
  primaryContact.party['roles'] = [];

  primaryContact.party.addresses.push(address);

  await connection.manager.save(primaryContact);

  // Organisation

  const primaryGeneratedColumnId = primaryContact.party.id + 1;

  const organisation = new Organisation('Pauline Hanson\'s One Nation', 'hey@onenation.org.au', '1300 857 466');

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

  logger.info('Create Pauline Hanson\'s One Nation complete!');

  return organisation;

}
