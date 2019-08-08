import { App } from './app';

import { IndividualController } from './api/controllers/individual.controller';

const app = new App(
  [
    new IndividualController()
  ],
);

app.listen();
