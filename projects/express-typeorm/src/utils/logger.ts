import { Logger, LoggerOptions, transports } from 'winston';

const options: LoggerOptions = {

  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
    }),
    new transports.File({ filename: 'debug.log', level: 'debug' })
  ]

};

// @ts-ignore
export const logger: Logger = new Logger(options);

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialised at debug level');
}

// export default logger;

// https://gist.github.com/williamhallatt/adaa9d14e3ac0795db723a2bf4acf794
