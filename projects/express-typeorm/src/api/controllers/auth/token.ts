import * as jwt from 'jsonwebtoken';

import { User } from '../../models/user';

import { config } from '../../../config/config';

import { logger } from '../../../lib/logger';

export function createAccessToken(user: User) {

  const token = jwt.sign(
    {
      groups: [ 'User', 'Administrator' ],
      scp: [ 'individual.post', 'individual.get', 'individual.patch', 'individual.delete'],
      user: user
    },
    config.get('jwtSecret'),
    {
      audience: 'http://localhost:3001/api',
      expiresIn: '1h',
      issuer: 'http://localhost:3001/authorise',
      subject: user.username
    }
  );

  logger.info('token: ' + JSON.stringify(token, null, 2) + '\n');

  return token;

}

// https://github.com/auth0/node-jsonwebtoken

// groups: [ 'Everyone', 'User', 'Administrator'],
