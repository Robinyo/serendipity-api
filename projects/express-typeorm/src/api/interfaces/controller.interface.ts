import { Router } from 'express';

export abstract class Controller {

  protected path = '/';
  protected router = Router();

  public getRoutes() {
    return this.router;
  }

}

// export default Controller;
