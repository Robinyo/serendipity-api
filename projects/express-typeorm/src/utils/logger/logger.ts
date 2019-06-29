import chalk from 'chalk';

const info = chalk.gray;
const warn = chalk.keyword('orange');
const error = chalk.bold.red;

abstract class LoggerInterface {

  public info: any;
  public warn: any;
  public error: any;

}

const noop = (): any => undefined;

class Logger implements LoggerInterface {

  private config = { isDebugMode: true };
  // private config = { isDebugMode: false };

  get info() {
    if (this.config.isDebugMode) {
      return console.info.bind(console, info('%s'));
    } else {
      return noop;
    }
  }

  get warn() {
    if (this.config.isDebugMode) {
      return console.warn.bind(console, warn('%s'));
    } else {
      return noop;
    }
  }

  get error() {
    if (this.config.isDebugMode) {
      return console.error.bind(console, error('%s'));
    } else {
      return noop;
    }
  }

}

export const logger: Logger = new Logger();

// https://www.tjvantoll.com/2015/12/29/console-error-bind/
// https://nodejs.org/docs/latest/api/console.html#console_console_log_data_args
// https://github.com/chalk/chalk

