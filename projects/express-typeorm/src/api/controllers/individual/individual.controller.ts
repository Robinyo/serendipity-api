import 'reflect-metadata';

import { getRepository, Like } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { Injectable, ReflectiveInjector } from 'injection-js';

import { Address } from '../../models/address';
import { Individual } from '../../models/individual';
import { IndividualRepository } from '../../repositorys/individual.repository';
import { Location } from '../../models/location';
import { LocationRepository } from '../../repositorys/location.repository';
import { Party } from '../../models/party';
import { PartyRepository } from '../../repositorys/party.repository';
import { Role } from '../../models/role';
import { RoleRepository } from '../../repositorys/role.repository';

import { Controller } from '../controller';

// import { checkJwt } from '../../middleware/auth-local/check-jwt';
import { authorise } from '../../middleware/auth-local/abac';
// import { authorise } from '../../middleware/auth-local/rbac';

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
    this.router.get(this.path, [authorise], this.execute);
    // this.router.get(this.path, this.execute);
  }

  protected executeImpl = async () => {

    logger.info('FindIndividualController: executeImpl()');

    logger.info('this.req.query: ' + JSON.stringify(this.req.query, null, 2));

    const filter = this.req.query.filter;
    const limit = this.req.query.limit || 100;
    const offset = this.req.query.offset || 0;

    const options = {
      skip: offset,
      take: limit,
      relations: ['party', 'party.addresses', 'party.roles']
    };

    if (filter) {

      options['where'] = [];

      const columns = Object.keys(filter);
      const column = {};

      // options['where'] = [
      //   { familyName: Like('C%') }
      // ];

      column[columns[0]] = Like(filter[columns[0]]);

      options['where'].push(column);
    }

    logger.info('options: ' + JSON.stringify(options, null, 2));

    try {

      const individualRepository: IndividualRepository = getRepository(Individual);

      const [ data, count ] = await individualRepository.findAndCount(options);

      const response = {
        data: data,
        // links: {},
        meta: {
          count: count
        }
      };


      // logger.info('response: ' + JSON.stringify(response, null, 2) + '\n');

      // return this.ok<Individual[]>(data);
      return this.ok(response);

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
    this.router.get(this.path, [authorise], this.execute);
    // this.router.get(this.path, this.execute);
  }

  protected executeImpl = async () => {

    const id: number = this.req.params.id;

    logger.info('FindOneIndividualController executeImpl() id: ' + this.req.params.id);

    try {

      const individualRepository: IndividualRepository = getRepository(Individual);

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
    this.router.post(this.path, [authorise], this.execute);
    // this.router.post(this.path, this.execute);
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

      const data = await individualRepository.save(individual);

      // logger.info('individual: ' + JSON.stringify(individual, null, 2) + '\n');

      // E.g.: http://127.0.0.1:3001/individuals/7
      return this.created<Individual>(this.basePath + PATH + '/' + data.id, data);

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
    this.router.patch(this.path, [authorise], this.execute);
    // his.router.patch(this.path, this.execute);
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

      const individualRepository: IndividualRepository = getRepository(Individual);

      await individualRepository.findOneOrFail(id, { relations: ['party', 'party.addresses', 'party.roles'] });

      const data = await individualRepository.save(individual);

      return this.ok<Individual>(data);

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
    this.router.delete(this.path, [authorise], this.execute);
    // this.router.delete(this.path, this.execute);
  }

  protected executeImpl = async () => {

    const id: number = this.req.params.id;

    logger.info('DeleteIndividualController executeImpl() id: ' + this.req.params.id);

    try {

      const locationRepository: LocationRepository = getRepository(Location);
      const partyRepository: PartyRepository = getRepository(Party);
      const roleRepository: RoleRepository = getRepository(Role);

      // https://github.com/typeorm/typeorm/issues/1270

      const party: Party =  await partyRepository.findOneOrFail(id, { relations: ['addresses', 'addresses.location', 'roles'] });

      // https://github.com/typeorm/typeorm/issues/1420

      party.addresses.forEach((address: Address) => {

        logger.info('address: ' + JSON.stringify(address, null, 2) + '\n');

        locationRepository.delete(address.location.id);
      });

      party.roles.forEach((role: Role) => {

        logger.info('role: ' + JSON.stringify(role, null, 2) + '\n');

        roleRepository.delete(role.id);
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

// https://github.com/typeorm/typeorm/blob/master/docs/find-options.md

// https://jsonapi.org/format/#fetching-pagination
// For example, a page-based strategy might use query parameters such as page[number] and page[size], an offset-based
// strategy might use page[offset] and page[limit], while a cursor-based strategy might use page[cursor].

// TypeORM uses an offset-based strategy: skip: 0, take: 100 -> offset & limit

/*

  const individualRepository: IndividualRepository = getRepository(Individual);

  const data = await individualRepository.find({
    skip: 0,
    take: 100,
    relations: ['party', 'party.addresses', 'party.roles']
  });

  return this.ok<Individual[]>(data);

} catch (error) {
  return this.handleError(error);
}

*/
