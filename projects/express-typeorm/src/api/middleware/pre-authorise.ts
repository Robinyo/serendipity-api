import { Request, Response, NextFunction } from 'express';

import OktaJwtVerifier from '@okta/jwt-verifier';

import { config } from '../../config/config';

// import { getAttributes } from '../utils/get-attributes';

import { Policy } from '../utils/policy';

import { logger } from '../../lib/logger';

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: config.get('clientId'),
  issuer: config.get('issuer')
});

// logger.info('checkJwt issuer: ' + config.get('issuer'));
// logger.info('checkJwt clientId: ' + config.get('clientId'));

export const preAuthorise = (req: Request, res: Response, next: NextFunction): void => {

  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    logger.error('Not a Bearer token');
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

  const accessToken = match[1];
  const expectedAudience = 'api://default';

  return oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience).then((jwt: any) => {

    logger.info('jwt.claims: ' + JSON.stringify(jwt.claims));

    //
    // See: https://en.wikipedia.org/wiki/XACML
    //

    const roles = Policy.getRoles(path, method);

    if (! Policy.hasRole(roles[0], jwt.claims.groups)) {

      logger.error('Not authorised');
      return res.status(401).end();
    }

    next();
  })
  .catch((error: any) => {
    logger.error('error: ' + error.message);
    res.status(401).send(error.message);
  });

};

// export default preAuthorise;

// logger.info('jwt.claims: ' + JSON.stringify(jwt.claims));
// logger.info('groups: ' + JSON.stringify(jwt.claims.groups));

// https://developer.okta.com/docs/guides/validate-access-tokens/overview/

// https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier
