import { Router, Request, Response } from 'express';

import contact from './contact';

const routes = Router();

// URI Path Design Guidelines
//
// - A singular noun should be used for document names.
// - A (simple) plural noun should be used for collection names (for example, /partys not /parties).
// - A plural noun should be used for store names.
// - A verb or verb phrase should be used for controller names.
// - Limit your URI's to a maximum of 2048 characters.
//
// See: https://github.com/Robinyo/restful-api-design-guidelines

routes.use('/contacts', contact);

export default routes;
