import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Individual } from '../entitys/individual.entity';

import { logger } from '../utils/logger/logger';

// Standard Request Methods
//
// Each HTTP method has specific, well-defined semantics within the context of a REST API’s resource model.
// POST should be used to create a new resource within a collection and execute controllers. GET is used to retrieve a
// representation of a resource’s state. PUT should be used to add a new resource to a store or update a resource (within a
// collection). DELETE removes a resource from its parent. HEAD is used to retrieve the metadata associated with the resource’s state
//
// See: https://github.com/Robinyo/restful-api-design-guidelines


class IndividualController {

  static getAll = async (req: Request, res: Response) => {

    const repository = getRepository(Individual);

    const data = await repository.find({ relations: ['organisation', 'address'] });

    // logger.info('contacts: ' + JSON.stringify(data));

    res.send(data);

  };

  static getOneById = async (req: Request, res: Response) => {

    const id: number = req.params.id;

    const repository = getRepository(Individual);

    try {

      const data = await repository.findOneOrFail(id, { relations: ['organisation', 'address'] });

      // logger.info('contact: ' + JSON.stringify(data));

      res.send(data);

    } catch (error) {

      res.status(404).send({
        'error': {
          'code': 404,
          'message': 'The specified resource was not found',
          'status': 'NOT_FOUND'
        }
      });

    }

  };

  static new = async (req: Request, res: Response) => {

    const individual = new Individual();

    Object.assign(individual, req.body);

    logger.info('individual: ' + JSON.stringify(individual));

    const errors = await validate(individual);

    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const repository = getRepository(Individual);

    try {

      //
      // Will insert or update
      //

      await repository.save(individual);

    } catch (error) {

      res.status(409).send({
        'error': {
          'code': 409,
          'message': 'The specified resource already exists',
          'status': 'ALREADY_EXISTS'
        }
      });

    }

    logger.info('id: ' + individual.id);

    res.status(201).send('Resource created');

  }

}

export default IndividualController;

// https://github.com/Robinyo/restful-api-design-guidelines
