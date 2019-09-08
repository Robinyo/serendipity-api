import { config } from '../../config/config';

import axios from 'axios';

import { logger } from '../../lib/logger';

export interface MethodDef {
  'method': string;
  'role': string;
  'scope': string;
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

  static getScopes = (path: string, method: string): string[] => {

    // logger.info('Policy: getScopes()');

    let scopes: string[] = [];

    try {

      const item = Policy.items.find((element) => {
        return element.path === path;
      });

      if (item !== undefined) {

        // logger.info('Policy getScopes() item !== undefined');

        const policy = item.methods.find((element) => {
          return element.method === method;
        });

        if (policy !== undefined) {
          // logger.info('Policy getScopes() policy !== undefined');
          scopes = [policy.scope];
        }

      }

    } catch (error) {
      logger.error(error);
    }

    logger.info('scopes: ' + scopes);

    return scopes;

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

  static hasScope = (scope: string, scopes: string[]): Boolean => {

    // logger.info('Policy: hasScope()');

    let hasScope = false;

    if (scope === '') {
      return hasScope;
    }

    try {

      hasScope = scopes.includes(scope);

    } catch (error) {
      logger.error(error);
    }

    logger.info('hasScope: ' + hasScope);

    return hasScope;

  };

}

// https://www.valentinog.com/blog/http-requests-node-js-async-await/
// https://stackoverflow.com/questions/50277504/is-there-any-reasons-to-use-axios-instead-es6-fetch

// https://github.com/axios/axios
