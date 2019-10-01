import { Request, Response, Router } from 'express';

import { HttpErrorDetails, HttpErrorResponse } from '../models/http-error-response';
import { INVALID_ARGUMENT, NOT_FOUND } from '../models/http-status-messages';

import { config } from '../../config/config';

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

  protected clientError(details?: HttpErrorDetails) {

    const message: HttpErrorResponse = {
      error: {
        code: 400,
        message: INVALID_ARGUMENT,
        status: 'INVALID_ARGUMENT'
      }};

    if (details) {
      message.error.details = details;
    }

    return this.res.status(message.error.code).json(message);
  }

  //
  // https://github.com/typeorm/typeorm/tree/master/src/error
  //

  protected handleError(error: Error) {

    const message: HttpErrorResponse = {
      error: {
        code: 500,
        message: error.message,
        status: error.name
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
