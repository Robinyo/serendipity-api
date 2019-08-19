import 'reflect-metadata';

import { getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { Injectable, ReflectiveInjector } from 'injection-js';

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

    logger.info('FindIndividualController: executeImpl()');

    try {

      const repository: IndividualRepository = getRepository(Individual);

      const data = await repository.find({ relations: ['party', 'party.addresses', 'party.roles'] });

      return this.ok<Individual[]>(data);

    } catch (error) {
      return this.handleError(error);
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

    const id: number = this.req.params.id;

    logger.info('FindOneIndividualController executeImpl() id: ' + this.req.params.id);

    let repository: IndividualRepository;

    try {

      repository = getRepository(Individual);

      const data = await repository.findOneOrFail(id, { relations: ['party', 'party.addresses', 'party.roles'] });

      return this.ok<Individual>(data);

    } catch (error) {
      return this.handleError(error);
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

    logger.info('CreateIndividualController: executeImpl()');

    try {

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

    } catch (error) {
      return this.handleError(error);
    }

  };

}

@Injectable()
export class UpdateIndividualController extends Controller {

  constructor() {
    super(`${PATH}/:id`);
  }

  protected initialiseRoutes() {
    // this.router.post(this.path, [preAuthorise], this.execute);
    this.router.patch(this.path, this.execute);
  }

  protected executeImpl = async () => {

    const id: number = this.req.params.id;

    logger.info('UpdateIndividualController executeImpl() id: ' + this.req.params.id);

    try {

      const individual = plainToClass(Individual, this.req.body);

      logger.info('individual: ' + JSON.stringify(individual, null, 2) + '\n');

      const errors = await validate(individual);

      if (errors.length > 0) {
        return this.clientError();
      }

      const repository = getRepository(Individual);

      await repository.findOneOrFail(id, { relations: ['party', 'party.addresses', 'party.roles'] });

      await repository.save(individual);

      return this.success();

    } catch (error) {
      return this.handleError(error);
    }

  };

}

@Injectable()
export class DeleteIndividualController extends Controller {

  constructor() {
    super(`${PATH}/:id`);
  }

  protected initialiseRoutes() {
    // this.router.get(this.path, [preAuthorise], this.execute);
    this.router.delete(this.path, this.execute);
  }

  protected executeImpl = async () => {

    const id: number = this.req.params.id;

    logger.info('DeleteIndividualController executeImpl() id: ' + this.req.params.id);

    try {

      const repository: IndividualRepository = getRepository(Individual);

      await repository.findOneOrFail(id, { relations: ['party', 'party.addresses', 'party.roles'] });

      await repository.delete(id);

      return this.success();

    } catch (error) {
      return this.handleError(error);
    }

  };

}

const individualControllers = [
  FindIndividualController,
  FindOneIndividualController,
  CreateIndividualController,
  UpdateIndividualController,
  DeleteIndividualController
];

const injector = ReflectiveInjector.resolveAndCreate(individualControllers);

export function IndividualControllerFactory(controllers = individualControllers) {

  const factory: Controller[] = [];

  controllers.forEach((controller) => {

    factory.push(injector.get(controller));
  });

  return factory;

}

// logger.info('error: ' + JSON.stringify(error, null, 2) + '\n');

// const individual = new Individual();
// Object.assign(individual, this.req.body);

/*

try {

  const individual = plainToClass(Individual, this.req.body);

  logger.info('individual: ' + JSON.stringify(individual, null, 2) + '\n');

  const errors = await validate(individual);

  if (errors.length > 0) {
    return this.clientError();
  }

  await repository.save(individual);

  // The server successfully processed the request and is not returning any content
  return this.res.sendStatus(204);

} catch (error) {
  return this.handleError(error);
}

*/
