import 'reflect-metadata';

import { getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { Injectable, ReflectiveInjector } from 'injection-js';

import { Address } from '../../models/address';
// import { AddressRepository } from '../../repositorys/address.repository';
import { Individual } from '../../models/individual';
import { IndividualRepository } from '../../repositorys/individual.repository';
import { Location } from '../../models/location';
import { LocationRepository } from '../../repositorys/location.repository';
import { Party } from '../../models/party';
import { PartyRepository } from '../../repositorys/party.repository';

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

      const individualRepository: IndividualRepository = getRepository(Individual);

      const data = await individualRepository.find({ relations: ['party', 'party.addresses', 'party.roles'] });

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

    let individualRepository: IndividualRepository;

    try {

      individualRepository = getRepository(Individual);

      const data = await individualRepository.findOneOrFail(id, {
        relations: ['party', 'party.addresses', 'party.roles']
      });

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

      // logger.info('individual: ' + JSON.stringify(individual, null, 2) + '\n');

      const errors = await validate(individual);

      if (errors.length > 0) {
        return this.clientError();
      }

      const individualRepository: IndividualRepository = getRepository(Individual);

      await individualRepository.save(individual);

      // logger.info('individual: ' + JSON.stringify(individual, null, 2) + '\n');

      // E.g.: http://127.0.0.1:3001/individuals/7
      // return this.created<Individual>(this.basePath + PATH + '/' + individual.party.id, individual);
      return this.created<Individual>(this.basePath + PATH + '/' + individual.id, individual);

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

      const individualRepository = getRepository(Individual);

      await individualRepository.findOneOrFail(id, { relations: ['party', 'party.addresses', 'party.roles'] });

      await individualRepository.save(individual);

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

      const locationRepository: LocationRepository = getRepository(Location);
      const partyRepository: PartyRepository = getRepository(Party);

      // https://github.com/typeorm/typeorm/issues/1270

      const party: Party =  await partyRepository.findOneOrFail(id, { relations: ['addresses', 'addresses.location', 'roles'] });

      // https://github.com/typeorm/typeorm/issues/1420

      party.addresses.forEach((address: Address) => {

        // logger.info('address: ' + JSON.stringify(address, null, 2) + '\n');

        locationRepository.delete(address.id);
      });

      party.addresses = [];
      party.roles = [];

      await partyRepository.save(party);

      // https://github.com/typeorm/typeorm/issues/3218

      await partyRepository.delete(id);

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

/*

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

      // this.basePath = 'http://127.0.0.1:3001/individuals/7';
      return this.created<Individual>(this.basePath + PATH + '/' + individual.id, individual);

    } catch (error) {
      return this.handleError(error);
    }

  };

}

 */

/*

  protected executeImpl = async () => {

    const id: number = this.req.params.id;

    logger.info('DeleteIndividualController executeImpl() id: ' + this.req.params.id);

    try {

      const addressRepository: AddressRepository = getRepository(Address);
      const partyRepository: PartyRepository = getRepository(Party);
      const individualRepository: IndividualRepository = getRepository(Individual);

      const individual: Individual = await individualRepository.findOneOrFail(id, {
        relations: ['party', 'party.addresses', 'party.roles']
      });

      // https://github.com/typeorm/typeorm/issues/1420

      individual.party.addresses.forEach(address => {
        addressRepository.delete(address);
      });

      individual.party.addresses = [];
      individual.party.roles = [];

      await individualRepository.save(individual);

      // await partyRepository.findOneOrFail(id, { relations: ['addresses', 'roles'] });

      // https://github.com/typeorm/typeorm/issues/3218

      await partyRepository.delete(id);

      return this.success();

    } catch (error) {
      return this.handleError(error);
    }

  };

*/

// logger.info('error: ' + JSON.stringify(error, null, 2) + '\n');

// const individual = new Individual();
// Object.assign(individual, this.req.body);

/*

      const partyRepository: PartyRepository = getRepository(Party);
      await partyRepository.findOneOrFail(id, { relations: ['addresses', 'roles'] });
      await partyRepository.delete(id);

// https://github.com/typeorm/typeorm/issues/3218
// Deleting the Party deletes the Individual

// https://typeorm.io/#/one-to-one-relations

@Type(() => Party)
@OneToOne(type => Party, {
  cascade: true,
  onDelete: 'CASCADE'
})
@JoinColumn({ name: 'partyId' })
party: Party;

*/

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
