import 'reflect-metadata';
import { Inject, Injectable } from 'injection-js';

import { Request, Response } from 'express';

import { preAuthorise } from '../middleware/pre-authorise';

import { Controller } from '../interfaces/controller.interface';

import { IndividualService } from '../services/individual.service';

import { logger } from '../../lib/logger';

// https://github.com/mgechev/injection-js
// https://v4.angular.io/guide/dependency-injection#why-injectable
// @Injectable() marks a class as available to an injector for instantiation.

@Injectable()
export class IndividualController extends Controller {

  static get parameters() {
    return [new Inject(IndividualService)];
  }

  constructor(private individualService: IndividualService) {

    super();

    this.path = '/individuals';

    this.initialiseRoutes();
  }

  private initialiseRoutes() {

    this.router.get(this.path, [preAuthorise], this.find);
    this.router.get(`${this.path}/:id`, [preAuthorise], this.findOne);
  }

  private find = async (request: Request, response: Response) => {

    logger.info('IndividualController: find()');

    const data = await this.individualService.find();

    response.json(data);

  };

  private findOne = async (request: Request, response: Response) => {

    logger.info('IndividualController findOne() id: ' + request.params.id);

    const id: number = request.params.id;

    try {

      const data = await this.individualService.findOne(id);

      response.json(data);

    } catch (error) {

      response.status(404).send({
        'error': {
          'code': 404,
          'message': 'The specified resource was not found',
          'status': 'NOT_FOUND'
        }
      });

    }

  };

}

// find() and findOne() are arrow functions because they access properties of an instance of the class.
// Since they are passed to the router and not called directly, the context changes.
// You can achieve the same result by calling  this.router.get(this.path, this.find.bind(this))

// export default IndividualController;

// logger.info('IndividualController find() data: ' + JSON.stringify(data));
// logger.info('IndividualController findOne() data: ' + JSON.stringify(data));

/*

  // private individualService: IndividualService;
  // constructor(individualService) {

    // this.individualService = individualService;

    // const injector: Injector = ReflectiveInjector.resolveAndCreate([IndividualService]);
    // this.individualService = injector.get(IndividualService);

*/
