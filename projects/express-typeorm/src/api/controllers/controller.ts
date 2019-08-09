import { Request, Response, Router } from 'express';

import { preAuthorise } from '../middleware/pre-authorise';

export abstract class Controller {

  protected path = '/';
  protected router = Router();

  protected req: Request;
  protected res: Response;

  constructor(path: string) {

    this.path = path;

    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.get(this.path, [preAuthorise], this.execute);
  }

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

  protected notFound(message?: string) {
    return this.jsonResponse(404, message ? message : 'The specified resource was not found');
  }

  protected fail(error: Error | string) {

    return this.res.status(500).json({
      message: error.toString()
    })

  }

}

// export default Controller;

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
