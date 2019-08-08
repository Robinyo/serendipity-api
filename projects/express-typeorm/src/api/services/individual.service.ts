import { getRepository } from 'typeorm';

import { Individual } from '../models/individual';
import { IndividualRepository } from '../repositorys/individual.repository';

import { logger } from '../../lib/logger';

// export class IndividualService {
export class IndividualService {

  public static async find(): Promise<Individual[]> {

    logger.info('IndividualService: find()');

    const repository: IndividualRepository = getRepository(Individual);

    return repository.find({ relations: ['organisation', 'address'] });
  }

  public static async findOne(id: number): Promise<Individual | undefined> {

    logger.info('IndividualService: findOne()');

    const repository: IndividualRepository = getRepository(Individual);

    return repository.findOneOrFail(id, { relations: ['organisation', 'address'] });
  }

  public static async create(individual: Individual): Promise<Individual> {

    logger.info('IndividualService: create()');

    const repository: IndividualRepository = getRepository(Individual);

    return repository.save(individual);
  }

}

// https://github.com/w3tecch/express-typescript-boilerplate
// https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/api/services/PetService.ts

/*

  private static repository: IndividualRepository = getRepository(Individual);

  constructor() {

    logger.info('IndividualService: constructor()');

    IndividualService.repository = getRepository(Individual);
  }

// import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

  @OrmRepository()
  private static readonly repository: IndividualRepository;
  // constructor(@OrmRepository() private readonly repository: IndividualRepository) {}

*/
