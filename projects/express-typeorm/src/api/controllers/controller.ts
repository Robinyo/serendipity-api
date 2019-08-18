import { Request, Response, Router } from 'express';

// import { preAuthorise } from '../middleware/pre-authorise';

const UNAUTHORIZED = 'Unauthorized';
const INVALID_ARGUMENT = 'Invalid Argument';
const NOT_FOUND = 'The specified resource was not found';
const PERMISSION_DENIED = 'Client does not have sufficient permission';

export abstract class Controller {

  protected path = '/';
  protected router = Router();

  protected req: Request;
  protected res: Response;

  constructor(path: string) {

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

    this.executeImpl();
  };

  protected jsonResponse(code: number, message: string) {
    return this.res.status(code).json({ message });
  }

  protected ok<T>(dto?: T) {

    if (!!dto) {
      return this.res.status(200).json(dto);
    } else {
      return this.res.sendStatus(200);
    }

  }

  protected created(location: string) {
    this.res.location(location).sendStatus(201);
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

  protected fail(error: Error | string) {

    return this.res.status(500).json({
      message: error.toString()
    })

  }

}

// export default Controller;

// https://khalilstemmler.com/articles/enterprise-typescript-nodejs/clean-consistent-expressjs-controllers/

// https://github.com/Robinyo/restful-api-design-guidelines

/*

public execute(req: Request, res: Response): void {

  this.req = req;
  this.res = res;

  this.executeImpl();
}

protected abstract async executeImpl(): Promise<void | any>;

*/

/*

  public getRoutes() {
    return this.router;
  }

      response.status(404).send({
        'error': {
          'code': 404,
          'message': 'The specified resource was not found',
          'status': 'NOT_FOUND'
        }
      });

*/
