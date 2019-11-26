import { EntityRepository, Repository } from 'typeorm';

import { Organisation } from '../models/organisation';

@EntityRepository(Organisation)
export class OrganisationRepository extends Repository<Organisation> {

}
