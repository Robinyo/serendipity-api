import { Injectable, ReflectiveInjector } from 'injection-js';

import { Controller } from '../controller';

import * as nodemailer from 'nodemailer';

// import { checkJwt } from '../../middleware/auth-local/check-jwt';
// import { authorise } from '../../middleware/auth-local/abac';
// import { authorise } from '../../middleware/auth-local/rbac';

import { config } from '../../../config/config';
import { logger } from '../../../lib/logger';

// https://github.com/mgechev/injection-js
// https://v4.angular.io/guide/dependency-injection#why-injectable
// @Injectable() marks a class as available to an injector for instantiation.

const PATH = '/email';

@Injectable()
export class SendEmailController extends Controller {

  constructor() {
    super(PATH);
  }

  protected initialiseRoutes() {
    // this.router.post(this.path, [authorise], this.execute);
    this.router.post(this.path, this.execute);
  }

  protected executeImpl = async () => {

    logger.info('SendEmailController: executeImpl()');

    try {

      logger.info('email: ' + JSON.stringify(this.req.body, null, 2) + '\n');

      const transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        // secure: true,
        auth: {
          user: config.get('user'),
          pass: config.get('pass')
        }
      });

      const options = {
        from: '"Serendipity CEP" <hey@serendipity.org.au>',
        to: this.req.body.to ? this.req.body.to : 'to_test@gmail.com',
        subject: this.req.body.subject ? this.req.body.subject : 'Hello',
        text: this.req.body.body ? this.req.body.body : 'Hello from Nodemailer',
        html: '<b>Hello World</b>'
      };

      const info = await transport.sendMail(options);

      logger.info('Message sent: %s', info.messageId);

      return this.success();

    } catch (error) {
      return this.handleError(error);
    }

  };

}

const emailControllers = [
  SendEmailController
];

const injector = ReflectiveInjector.resolveAndCreate(emailControllers);

export function EmailControllerFactory(controllers = emailControllers) {

  const factory: Controller[] = [];

  controllers.forEach((controller) => {

    factory.push(injector.get(controller));
  });

  return factory;

}
