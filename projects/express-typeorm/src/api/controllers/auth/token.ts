import * as jwt from 'jsonwebtoken';

import { User } from '../../models/user';

import { config } from '../../../config/config';

import { logger } from '../../../lib/logger';

// const scopes = [ 'individual' ];
// const scopes = [ 'individual:post-get-patch', 'individual:delete'];
const scopes = [ 'individual:post', 'individual:get', 'individual:patch', 'individual:delete' ];
const AUDIENCE = 'http://localhost:3001/api';
const ISSUER = 'http://localhost:3001/authorize';

// As a JWT is included in a HTTP Header, so we have an upper limit of 8K for most servers
// 1 char === 1 byte so 1024 chars === 1k

export function createIdToken(user: User) {

  const token = jwt.sign(
      {
        // name: user.name,
        username: user.username,

        family_name: user.familyName,
        given_name: user.givenName,
        // birthdate: user.birthdate
        // tdif_core_last_updated: '',
        email: user.email,
        email_verified: user.emailVerified,
        // tdif_email_updated_at: '',
        // phone_number: user.phoneNumberVerified,
        // phone_number_verified: user.phoneNumberVerified,
        // tdif_phone_number_updated_at: '',
        // tdif_other_names
        // tdif_other_names_updated_at
        // tdif_doc
        // auth_time
        // tdif_audit_id
        updated_at: user.specialColumns.updatedAt,
      },
      config.get('jwtSecret'),
      {
        audience: AUDIENCE,
        expiresIn: '1h',
        issuer: ISSUER,
        subject: user.username
      }
  );

  logger.info('token: ' + JSON.stringify(token, null, 2) + '\n');
  logger.info('token length: ' + token.length + '\n');

  return token;

}

export function createAccessToken(user: User) {

  const token = jwt.sign(
    {
      groups: [ 'User', 'Administrator' ],
      scp: scopes,
    },
    config.get('jwtSecret'),
    {
      audience: AUDIENCE,
      expiresIn: '1h',
      issuer: ISSUER,
      subject: user.username
    }
  );

  logger.info('token: ' + JSON.stringify(token, null, 2) + '\n');
  logger.info('token length: ' + token.length + '\n');

  return token;

}

// tslint:disable-next-line:max-line-length
// https://dta-www-drupal-20180130215411153400000001.s3.ap-southeast-2.amazonaws.com/s3fs-public/files/digital-identity/tdif-attribute-profile.pdf

// https://github.com/auth0-blog/nodejs-jwt-authentication-sample

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

// https://developer.okta.com/docs/guides/implement-auth-code-pkce/exchange-code-token/

/*

{
    "access_token": "eyJhb[...]Hozw",
    "expires_in": 3600,
    "id_token": "eyJhb[...]jvCw",
    "scope": "openid",
    "token_type": "Bearer"
}

*/

/*

export function createAccessToken(user: User) {

  const token = jwt.sign(
    {
      groups: [ 'User', 'Administrator' ],
      scp: scopes,
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
      issuer: 'http://localhost:3001/token',
      subject: user.username
    }
  );

  logger.info('token: ' + JSON.stringify(token, null, 2) + '\n');
  logger.info('token length: ' + token.length + '\n');

  return token;

}

*/
