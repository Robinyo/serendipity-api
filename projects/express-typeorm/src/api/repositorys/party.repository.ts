import { EntityRepository, Repository } from 'typeorm';

import { Party } from '../models/party';

@EntityRepository(Party)
export class PartyRepository extends Repository<Party> {

}
