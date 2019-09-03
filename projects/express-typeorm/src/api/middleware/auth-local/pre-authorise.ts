import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';

import { Policy } from '../../utils/policy';

import { config } from '../../../config/config';
import { logger } from '../../../lib/logger';

export const preAuthorise = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    logger.error('checkJwt !match');
    return res.status(401).end();
  }

  //
  // URI Path Design
  // See: https://github.com/Robinyo/restful-api-design-guidelines#uri-path-design
  //

  const path = req.route.path || '/';

  //
  // See: https://github.com/Robinyo/restful-api-design-guidelines#standard-request-methods
  //

  const method = req.route.stack[0].method.toUpperCase() || 'GET';

  logger.info(method + ' ' + path + ' HTTP/1.1');

  const token = match[1];

  try {

    const jwtPayload = <any> jwt.verify(token, config.get('jwtSecret'));

    logger.info('jwtPayload: ' + JSON.stringify(jwtPayload));

    //
    // See: https://en.wikipedia.org/wiki/XACML
    //

    const roles = Policy.getRoles(path, method);

    if (! Policy.hasRole(roles[0], jwtPayload.groups)) {

      logger.error('Not authorised');
      return res.status(401).end();
    }

    res.locals.jwtPayload = jwtPayload;

  } catch (error) {
    logger.error('checkJwt error: ' + error.message);
    return res.status(401).send(error.message);
  }

  next();

};
