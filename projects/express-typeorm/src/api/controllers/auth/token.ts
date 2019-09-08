import * as jwt from 'jsonwebtoken';

import { User } from '../../models/user';

import { config } from '../../../config/config';

import { logger } from '../../../lib/logger';

export function createAccessToken(user: User) {

  const token = jwt.sign(
    {
      groups: [ 'User', 'Administrator' ],
      // scp: [ 'individual' ],
      scp: [ 'individual:post', 'individual:get', 'individual:patch', 'individual:delete' ],
      // scp: [ 'individual:post-get-patch', 'individual:delete'],
      username: user.username,
      // name: user.name,
      givenName: user.givenName,
      // middleName: user.middleName,
      familyName: user.familyName,
      // nickname: user.nickname,
      // preferredUsername: user.preferredUsername
      // profile: user.profile
      // picture: user.picture,
      // website: user.website
      // gender: user.gender
      // birthdate: user.birthdate
      // zoneinfo: user.zoneinfo
      // locale: user.locale
      updatedAt: user.specialColumns.updatedAt,
      email: user.email,
      emailVerified: user.emailVerified
      // address: user.address
      // phoneNumber: user.phoneNumber,
      // phoneNumberVerified: user.phoneNumberVerified
    },
    config.get('jwtSecret'),
    {
      audience: 'http://localhost:3001/api',
      expiresIn: '1h',
      issuer: 'http://localhost:3001/authorize',
      subject: user.username
    }
  );

  logger.info('token: ' + JSON.stringify(token, null, 2) + '\n');

  return token;

}

// https://en.wikipedia.org/wiki/Uniform_Resource_Name#Examples

// https://github.com/auth0/node-jsonwebtoken

// groups: [ 'Everyone', 'User', 'Administrator'],

/*

      user: {
        username: user.username,
        // name: user.name,
        givenName: user.givenName,
        // middleName: user.middleName,
        familyName: user.familyName,
        // nickname: user.nickname,
        // preferredUsername: user.preferredUsername
        // profile: user.profile
        // picture: user.picture,
        // website: user.website
        // gender: user.gender
        // birthdate: user.birthdate
        // zoneinfo: user.zoneinfo
        // locale: user.locale
        updatedAt: user.specialColumns.updatedAt,
        email: user.email,
        emailVerified: user.emailVerified
        // address: user.address
        // phoneNumber: user.phoneNumber,
        // phoneNumberVerified: user.phoneNumberVerified
      }


*/
