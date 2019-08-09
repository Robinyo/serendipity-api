import 'reflect-metadata';
import { Injectable } from 'injection-js';

import { getRepository } from 'typeorm';

import { Individual } from '../models/individual';
import { IndividualRepository } from '../repositorys/individual.repository';

import { logger } from '../../lib/logger';

// https://github.com/mgechev/injection-js
// https://v4.angular.io/guide/dependency-injection#why-injectable
// @Injectable() marks a class as available to an injector for instantiation.

@Injectable()
export class IndividualService {

  private repository: IndividualRepository;

  public async find(): Promise<Individual[]> {

    logger.info('IndividualService: find()');

    if (! this.repository) { this.init(); }

    return this.repository.find({ relations: ['organisation', 'address'] });
  }

  public async findOne(id: number): Promise<Individual | undefined> {

    if (! this.repository) { this.init(); }

    logger.info('IndividualService: findOne()');

    return this.repository.findOneOrFail(id, { relations: ['organisation', 'address'] });
  }

  public async create(individual: Individual): Promise<Individual> {

    logger.info('IndividualService: create()');

    if (! this.repository) { this.init(); }

    return this.repository.save(individual);
  }

  private init() {
    this.repository = getRepository(Individual);
  }

}

/*

  constructor() {

    // Error: Connection "default" was not found.: Error during instantiation of IndividualService!.
    this.repository = getRepository(Individual);
  }

*/
