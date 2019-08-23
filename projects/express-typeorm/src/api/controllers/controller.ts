import { Request, Response, Router } from 'express';

// import { preAuthorise } from '../middleware/pre-authorise';

import { config } from '../../config/config';

// import { logger } from '../../lib/logger';

const INVALID_ARGUMENT = 'Invalid Argument';
const NOT_FOUND = 'The specified resource was not found';

export abstract class Controller {

  protected basePath;
  protected path;
  protected router = Router();

  protected req: Request;
  protected res: Response;

  constructor(path: string) {

    // this.basePath = 'http://127.0.0.1:3001';
    this.basePath = config.get('protocol') + '://' + config.get('ip') + ':' + config.get('port');
    this.path = path;

    this.initialiseRoutes();
  }

  protected abstract initialiseRoutes();

  public getRoutes() {
    return this.router;
  }

  // execute() and executeImpl() are arrow functions because they access properties of an instance of the class.
  // Since they are passed to the router and not called directly, the context changes.
  // You can achieve the same result by calling this.router.get(this.path, this.execute.bind(this))

  protected abstract async executeImpl(): Promise<void | any>;

  protected execute = async (req: Request, res: Response) => {

    this.req = req;
    this.res = res;

    // logger.info('req.body: ' + JSON.stringify(this.req.body, null, 2) + '\n');

    this.executeImpl();
  };

  protected ok<T>(dto?: T) {

    if (!!dto) {
      return this.res.status(200).json(dto);
    } else {
      return this.res.sendStatus(200);
    }

  }

  protected success() {
    return this.res.sendStatus(204);
  }

  protected created<T>(location: string, dto?: T) {
    return this.res.location(location).status(201).json(dto);
  }

  protected clientError() {

    const message = {
      'error': {
        'code': 400,
        'message': INVALID_ARGUMENT,
        'status': 'INVALID_ARGUMENT'
      }};

    return this.res.status(message.error.code).json(message);
  }

  //
  // https://github.com/typeorm/typeorm/tree/master/src/error
  //

  protected handleError(error: Error) {

    const message = {
      'error': {
        'code': 500,
        'message': error.message,
        'status': error.name
      }};

    switch (error.name) {

      case 'InsertValuesMissingError':

        message.error.code = 400;
        break;

      case 'EntityNotFound':

        message.error.code = 404;
        message.error.message = NOT_FOUND;
        message.error.status = 'NOT_FOUND';
        break;

      default:
        break;

    }

    return this.res.status(message.error.code).json(message);
  }

}

// export default Controller;

// https://github.com/typeorm/typeorm/tree/master/src/error

// https://khalilstemmler.com/articles/enterprise-typescript-nodejs/clean-consistent-expressjs-controllers/

// https://github.com/Robinyo/restful-api-design-guidelines

// const INTERNAL = 'Internal server error';
// const UNAUTHORIZED = 'Unauthorized';
// const PERMISSION_DENIED = 'Client does not have sufficient permission';

/*

const CREATED = 'Created :)';

  protected created(location: string) {
    return this.res.location(location).status(201).json({
      'code': 201,
      'message': CREATED
    });
  }

  protected jsonResponse(code: number, message: string) {
    return this.res.status(code).json({ message });
  }

  protected clientError(message?: string) {
    return this.jsonResponse(400, message ? message : INVALID_ARGUMENT);
  }

  protected fail(error: Error) {

    return this.res.status(500).json({
      'error': {
        'code': 500,
        'message': error.message,
        'status': error.name
      }
    });

  }

  protected clientError(message?: string) {
    return this.jsonResponse(400, message ? message : INVALID_ARGUMENT);
  }

  protected unauthorized(message?: string) {
    return this.jsonResponse(401, message ? message : UNAUTHORIZED);
  }

  protected forbidden (message?: string) {
    return this.jsonResponse(403, message ? message : PERMISSION_DENIED);
  }

  protected notFound(message?: string) {
    return this.jsonResponse(404, message ? message : NOT_FOUND);
  }

*/

/*

error: {
  "name": "EntityNotFound",
  "message": "Could not find any entity of type \"Individual\" matching: \"12\""
}

    return this.res.status(500).json({
      message: error.toString()
    })

      response.status(404).send({
        'error': {
          'code': 404,
          'message': 'The specified resource was not found',
          'status': 'NOT_FOUND'
        }
      });

*/
