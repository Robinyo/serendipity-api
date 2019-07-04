import { Request, Response, NextFunction } from 'express';

import OktaJwtVerifier from '@okta/jwt-verifier';

import { config } from '../../config/config';

import { logger } from '../../lib/logger';

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: config.get('issuer'),
  clientId: config.get('clientId'),
  assertClaims: {
    aud: 'api://default',
  },
});

logger.info('checkJwt issuer: ' + config.get('issuer'));
logger.info('checkJwt clientId: ' + config.get('clientId'));

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    logger.error('checkJwt !match');
    return res.status(401).end();
  }

  const accessToken = match[1];
  const expectedAudience = 'api://default';

  return oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience).then((jwt: any) => {
    // req.jwt = jwt;
    logger.info('checkJwt jwt.claims: ' + JSON.stringify(jwt.claims));
    next();
  })
  .catch((error: any) => {
    logger.error('checkJwt error: ' + error.message);
    res.status(401).send(error.message);
  });

};

// https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier
