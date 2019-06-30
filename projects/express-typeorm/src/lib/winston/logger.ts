// https://github.com/microsoft/TypeScript-Node-Starter/issues/177

import winston from 'winston';
import { Logger } from 'winston';

export const logger: Logger = winston.createLogger({

  transports: [
    new winston.transports.Console({ level: process.env.NODE_ENV === 'production' ? 'error' : 'debug' })
    // new winston.transports.File({ filename: 'debug.log', level: 'debug'})
  ]

});

if (process.env.NODE_ENV !== 'production') {
  logger.info('Logging initialised at debug level');
}

// export default logger;

// Support for Filename and Line Number
// https://gist.github.com/ludwig/b47b5de4a4c53235825af3b4cef4869a
// https://github.com/winstonjs/winston/issues/200
// https://github.com/winstonjs/winston/issues/553
// https://stackoverflow.com/questions/11386492/accessing-line-number-in-v8-javascript-chrome-node-js

/*

// https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/util/logger.ts

import { Logger, LoggerOptions, transports } from "winston";

const options: LoggerOptions = {
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug"
    }),
    new transports.File({ filename: "debug.log", level: "debug" })
  ]
};

const logger = new Logger(options);

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;

*/
