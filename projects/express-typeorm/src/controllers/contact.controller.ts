import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Contact } from '../entitys/contact';

import { logger } from '../utils/logger/logger';

// Standard Request Methods
//
// Each HTTP method has specific, well-defined semantics within the context of a REST API’s resource model.
// POST should be used to create a new resource within a collection and execute controllers. GET is used to retrieve a
// representation of a resource’s state. PUT should be used to add a new resource to a store or update a resource (within a
// collection). DELETE removes a resource from its parent. HEAD is used to retrieve the metadata associated with the resource’s state
//
// See: https://github.com/Robinyo/restful-api-design-guidelines


class ContactController {

  static getAll = async(req: Request, res: Response) => {

    const contactRepository = getRepository(Contact);

    const contacts = await contactRepository.find({ relations: ['organisation'] });

    // logger.info('contacts: ' + JSON.stringify(contacts));

    res.send(contacts);

  };

  static getOneById = async(req: Request, res: Response) => {

    const id: number = req.params.id;

    const contactRepository = getRepository(Contact);

    try {

      const contact = await contactRepository.findOneOrFail(id, { relations: ['organisation'] });

      // logger.info('contact: ' + JSON.stringify(contact));

      res.send(contact);

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

  static newContact = async(req: Request, res: Response) => {

    const contact = new Contact();

    Object.assign(contact, req.body);

    // logger.info('contact: ' + JSON.stringify(contact));

    const errors = await validate(contact);

    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const contactRepository = getRepository(Contact);

    try {

      await contactRepository.save(contact);

    } catch (error) {

      res.status(409).send({
        'error': {
          'code': 409,
          'message': 'The specified resource already exists',
          'status': 'ALREADY_EXISTS'
        }
      });

    }

    res.status(201).send('Contact created');

  }

}

export default ContactController;

// https://github.com/Robinyo/restful-api-design-guidelines

/*

      res.status(404).send({
        'error': {
          'code': 400,
          'message': 'The client specified an invalid argument',
          'status': 'INVALID_ARGUMENT',
          'details': [
            {
              'code': 'NullValue',
              'target': 'familyName',
              'message': 'Family name must not be null'
            }
          ]
        }
      });

*/
