import 'reflect-metadata';

import { Injectable, ReflectiveInjector } from 'injection-js';

import { getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { Individual } from '../../models/individual';
import { IndividualRepository } from '../../repositorys/individual.repository';
import { Party } from '../../models/party';
import { PartyRepository } from '../../repositorys/Party.repository';

import { Controller } from '../controller';

import { logger } from '../../../lib/logger';

// https://github.com/mgechev/injection-js
// https://v4.angular.io/guide/dependency-injection#why-injectable
// @Injectable() marks a class as available to an injector for instantiation.

const PATH = '/individuals';

@Injectable()
export class FindIndividualController extends Controller {

  constructor() {
    super(PATH);
  }

  protected initialiseRoutes() {
    // this.router.get(this.path, [preAuthorise], this.execute);
    this.router.get(this.path, this.execute);
  }

  protected executeImpl = async () => {

    try {

      logger.info('FindIndividualController: executeImpl()');

      const repository: IndividualRepository = getRepository(Individual);

      const data = await repository.find({ relations: ['party', 'party.addresses', 'party.roles'] });

      return this.ok<Individual[]>(data);

    } catch (err) {
      return this.fail(err.toString())
    }

  };

}

@Injectable()
export class FindOneIndividualController extends Controller {

  constructor() {
    super(`${PATH}/:id`);
  }

  protected initialiseRoutes() {
    // this.router.get(this.path, [preAuthorise], this.execute);
    this.router.get(this.path, this.execute);
  }

  protected executeImpl = async () => {

    try {

      logger.info('FindOneIndividualController executeImpl() id: ' + this.req.params.id);

      const id: number = this.req.params.id;

      const repository: IndividualRepository = getRepository(Individual);

      const data = await repository.findOneOrFail(id, { relations: ['party', 'party.addresses', 'party.roles'] });

      return this.ok<Individual>(data);

    } catch (err) {
      return this.fail(err.toString())
    }

  };

}

@Injectable()
export class CreateIndividualController extends Controller {

  constructor() {
    super(PATH);
  }

  protected initialiseRoutes() {
    // this.router.post(this.path, [preAuthorise], this.execute);
    this.router.post(this.path, this.execute);
  }

  protected executeImpl = async () => {

    try {

      logger.info('CreateIndividualController: executeImpl()');

      // const individual = new Individual();
      // Object.assign(individual, this.req.body);

      const individual = plainToClass(Individual, this.req.body);

      logger.info('individual: ' + JSON.stringify(individual, null, 2) + '\n');

      const errors = await validate(individual);

      if (errors.length > 0) {
        return this.clientError();
      }

      const partyRepository: PartyRepository = getRepository(Party);
      const individualRepository: IndividualRepository = getRepository(Individual);

      const party = new Party();

      party.partyType = 'Individual';
      party.displayName = individual.party.displayName;
      party.addresses = [].concat(individual.party.addresses);
      party.roles = [].concat(individual.party.roles);

      await partyRepository.save(party);

      individual.party = party;
      individual.id = party.id;

      await individualRepository.save(individual);

      return this.created(PATH + '/' + party.id);

    } catch (err) {
      return this.fail(err.toString())
    }

  };

}

const individualControllers = [
  FindIndividualController,
  FindOneIndividualController,
  CreateIndividualController
];

const injector = ReflectiveInjector.resolveAndCreate(individualControllers);

export function IndividualControllerFactory(controllers = individualControllers) {

  const factory: Controller[] = [];

  controllers.forEach((controller) => {

    factory.push(injector.get(controller));
  });

  return factory;

}
