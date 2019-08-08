import { EntityRepository, Repository } from 'typeorm';

import { Individual } from '../models/individual';

@EntityRepository(Individual)
export class IndividualRepository extends Repository<Individual> {

}
