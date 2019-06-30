import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';

// const app = express();
export const app = express();

// logger.info('Serendipity CRM REST API successfully initialised');
// logger.warn('Warn');
// logger.error('Error');

//
// https://expressjs.com/en/advanced/best-practice-security.html
// https://expressjs.com/en/resources/middleware/cors.html
//

const whitelist = ['http://localhost', 'https://serendipity.org.au'];

const corsOptions = {
  origin: function(origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

// app.use(cors(corsOptions));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

app.use('/api/', routes);

// export default app;
