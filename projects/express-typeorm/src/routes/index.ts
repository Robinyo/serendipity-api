import { Router, Request, Response } from 'express';

import contact from './contact';

const routes = Router();

routes.use('/contacts', contact);

export default routes;
