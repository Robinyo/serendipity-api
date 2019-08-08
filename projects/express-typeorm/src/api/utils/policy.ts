import { config } from '../../config/config';

import axios from 'axios';

import { logger } from '../../lib/logger';

export interface MethodDef {
  'method': string;
  'role': string;
}

export interface PolicyDef {
  'path': string;
  'methods': Array<MethodDef>;
}

export class Policy {

  private static readonly url = 'public/data/policys.json';
  private static items: PolicyDef[];

  static load = async () => {

    logger.info('Policy: load()');

    try {

      // axios.defaults.baseURL = 'http://127.0.0.1:3001';
      axios.defaults.baseURL = config.get('protocol') + '://' + config.get('ip') + ':' + config.get('port');

      logger.info('Policy load() baseURL: ' + axios.defaults.baseURL);

      const response = await axios.get(Policy.url);
      Policy.items = response.data;

      // logger.info('items: ' + JSON.stringify(Policy.items));

      // const roles = Policy.getRoles('/contacts', 'DELETE');
      // Policy.hasRole(roles[0], ['Everyone', 'User', 'Administrator']);

    } catch (error) {
      logger.error(error);
    }

  };

  static getRoles = (path: string, method: string): string[] => {

    // logger.info('Policy: getRoles()');

    let roles: string[] = [];

    try {

      const item = Policy.items.find((element) => {
        return element.path === path;
      });

      if (item !== undefined) {

        // logger.info('Policy getRoles() item !== undefined');

        const policy = item.methods.find((element) => {
          return element.method === method;
        });

        if (policy !== undefined) {
          // logger.info('Policy getRoles() policy !== undefined');
          roles = [policy.role];
        }

      }

    } catch (error) {
      logger.error(error);
    }

    logger.info('roles: ' + roles);

    return roles;

  };

  static hasRole = (role: string, groups: string[]): Boolean => {

    // logger.info('Policy: hasRole()');

    let hasRole = false;

    if (role === '') {
      return hasRole;
    }

    try {

      hasRole = groups.includes(role);

    } catch (error) {
      logger.error(error);
    }

    logger.info('hasRole: ' + hasRole);

    return hasRole;

  };

}

// export default Policy;

// static hasRole = (roles: string[], groups: string[]): Boolean => {

// https://github.com/axios/axios

// https://www.valentinog.com/blog/http-requests-node-js-async-await/
// https://stackoverflow.com/questions/50277504/is-there-any-reasons-to-use-axios-instead-es6-fetch

// https://github.com/typestack/class-transformer
// Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors

/*


  static getAll = async () => {

    logger.info('Policy getAll()');

    try {



    } catch (error) {

      logger.error(error);
    }

  };


*/

/*

  static getRoles = (path: string, method: string) => {

    logger.info('Policy: getRoles()');

    let roles: Array<String> = [];

    try {

      for (const item of Policy.items) {

        if (item.path === path) {

          logger.info('Policy getRoles() item.path === path');

          const policy = item.methods.find((element) => {
            return element.method === method;
          });

          if (policy !== undefined) {
            logger.info('Policy getRoles() policy !== undefined');
            roles = [policy.role];
          }

          break;
        }
      }


    } catch (error) {
      logger.error(error);
    }

    logger.info('roles: ' + roles);

    return roles;

  };

*/

/*

// import { logger } from '../../lib/logger';

export const getRoles = (path: string, method: string): Array<String> => {

  // path = '/contacts'
  // method = 'GET' || 'POST' || 'PATCH' 'PUT' || 'DELETE'

  let roles: string[];

  switch (path) {

    case '/contacts':

      roles = ['User'];
      break;

    case '/individuals':

      roles = ['User'];
      break;

    default:

      roles = ['Administrator'];
      break;

  }

  return roles;

};

// 'Guest', 'User, 'Administrator'

*/
