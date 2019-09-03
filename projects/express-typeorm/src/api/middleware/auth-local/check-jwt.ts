import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';

import { config } from '../../../config/config';
import { logger } from '../../../lib/logger';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    logger.error('checkJwt !match');
    return res.status(401).end();
  }

  const token = match[1];

  try {

    const jwtPayload = jwt.verify(token, config.get('jwtSecret'));

    logger.info('jwtPayload: ' + JSON.stringify(jwtPayload));

    res.locals.jwtPayload = jwtPayload;

  } catch (error) {
    logger.error('checkJwt error: ' + error.message);
    return res.status(401).send(error.message);
  }

  next();

};
