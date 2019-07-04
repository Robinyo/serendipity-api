// import { Body, Controller, Delete, Get, JsonController, Param, Post, Put, Req, Res, UseBefore } from 'routing-controllers';

import { Controller, Delete, Get, Param, Post, Put, Req, Res, UseBefore } from 'routing-controllers';

import { preAuthorise } from '../middleware/preAuthorise';

@Controller()
export class IndividualController {

  @Get('/individuals')
  @UseBefore(preAuthorise) // Error: Can't set headers after they are sent.
  getAll() {
    return '{ "some": "JSON" }';
  };

}

// router.get('/', [checkJwt], IndividualController.getAll);

// https://github.com/Robinyo/restful-api-design-guidelines

// @Use(permitAuth())

// @Controller()
// @JsonController()

/*

export function loggingMiddleware(request: any, response: any, next?: (err?: any) => any): any {
    console.log("do something...");
    next();
}

*/
