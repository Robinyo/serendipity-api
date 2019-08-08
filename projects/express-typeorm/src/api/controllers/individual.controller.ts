import { Request, Response } from 'express';

import { preAuthorise } from '../middleware/pre-authorise';

import { Controller } from '../interfaces/controller.interface';

import { IndividualService } from '../services/individual.service';

import { logger } from '../../lib/logger';

export class IndividualController extends Controller {

  constructor() {

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

    const data = await IndividualService.find();

    response.json(data);

  };

  private findOne = async (request: Request, response: Response) => {

    logger.info('IndividualController findOne() id: ' + request.params.id);

    const id: number = request.params.id;

    try {

      const data = await IndividualService.findOne(id);

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
