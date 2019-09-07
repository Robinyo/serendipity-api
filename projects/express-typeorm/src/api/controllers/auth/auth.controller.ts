import 'reflect-metadata';

import { getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { Injectable, ReflectiveInjector } from 'injection-js';

import { User } from '../../models/user';
import { UserRepository } from '../../repositorys/user.repository';

import { Controller } from '../controller';

import { createAccessToken } from './token';

import { logger } from '../../../lib/logger';

// https://github.com/mgechev/injection-js
// https://v4.angular.io/guide/dependency-injection#why-injectable
// @Injectable() marks a class as available to an injector for instantiation.

const LOGIN = '/login';
const REGISTER = '/register';

@Injectable()
export class RegisterUserController extends Controller {

  constructor() {
    super(REGISTER);
  }

  protected initialiseRoutes() {
    this.router.post(this.path, this.execute);
  }

  protected executeImpl = async () => {

    logger.info('CreateUserController: executeImpl()');

    try {

      let user: User = plainToClass(User, this.req.body);

      // logger.info('user: ' + JSON.stringify(user, null, 2) + '\n');

      const errors = await validate(user);

      if (errors.length > 0) {
        return this.clientError();
      }

      const userRepository: UserRepository = getRepository(User);

      user.hashPassword();

      user = await userRepository.save(user);

      user.password = '';

      return this.ok<any>(createAccessToken(user));

    } catch (error) {
      return this.handleError(error);
    }

  };

}

@Injectable()
export class LoginUserController extends Controller {

  constructor() {
    super(LOGIN);
  }

  protected initialiseRoutes() {
    this.router.post(this.path, this.execute);
  }

  protected executeImpl = async () => {

    logger.info('LoginUserController executeImpl()');

    try {

      const { username, password } = this.req.body;

      if (!(username && password)) {
        return this.clientError();
      }

      const userRepository: UserRepository = getRepository(User);

      const user: User = await userRepository.findOneOrFail({ where: { username } });

      // logger.info('user: ' + JSON.stringify(user, null, 2) + '\n');

      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        return this.clientError();
      }

      user.password = '';

      return this.ok<any>(createAccessToken(user));

    } catch (error) {
      return this.handleError(error);
    }

  };

}

const authControllers = [
  RegisterUserController,
  LoginUserController
];

const injector = ReflectiveInjector.resolveAndCreate(authControllers);

export function AuthControllerFactory(controllers = authControllers) {

  const factory: Controller[] = [];

  controllers.forEach((controller) => {

    factory.push(injector.get(controller));
  });

  return factory;

}

// logger.info('username: ' + username);
// logger.info('password: ' + password);

// logger.info('individual: ' + JSON.stringify(data, null, 2) + '\n');

// E.g.: http://127.0.0.1:3001/users/7
// return this.created<User>(this.basePath + PATH + '/' + data.id, data);
