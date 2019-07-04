// import { logger } from '../../lib/logger';

export const getAttributes = (path: string, method: string): Array<String> => {

  // path = '/contacts', method = 'GET' || 'POST' || 'PATCH' 'PUT' || 'DELETE'

  return ['individualRead = true'];

};
