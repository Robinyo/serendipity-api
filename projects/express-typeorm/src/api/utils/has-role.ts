// import { logger } from '../../lib/logger';

export const hasRole = (role: string): Boolean => {

  const roles: string[] = ['Guest', 'User', 'Administrator'];

  return roles.includes(role);

};
