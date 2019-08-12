import 'reflect-metadata';
import { Injectable, ReflectiveInjector } from 'injection-js';

import { getRepository } from 'typeorm';

import { Individual } from '../../models/individual';
import { IndividualRepository } from '../../repositorys/individual.repository';

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

  protected executeImpl = async () => {

    try {

      logger.info('FindIndividualController: executeImpl()');

      const repository: IndividualRepository = getRepository(Individual);

      const data = await repository.find({ relations: ['organisation', 'addresses'] });

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

  protected executeImpl = async () => {

    try {

      logger.info('FindOneIndividualController executeImpl() id: ' + this.req.params.id);

      const id: number = this.req.params.id;

      const repository: IndividualRepository = getRepository(Individual);

      const data = await repository.findOneOrFail(id, { relations: ['organisation', 'addresses'] });

      return this.ok<Individual>(data);

    } catch (err) {
      return this.fail(err.toString())
    }

  };

}

const individualControllers = [
  FindIndividualController,
  FindOneIndividualController
];

const injector = ReflectiveInjector.resolveAndCreate(individualControllers);

export function IndividualControllerFactory(controllers = individualControllers) {

  const factory: Controller[] = [];

  controllers.forEach((controller) => {

    factory.push(injector.get(controller));
  });

  return factory;

}
