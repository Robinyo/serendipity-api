import stackTrace from 'stack-trace';

import path from 'path';

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

      const frame = stackTrace.get()[1];
      const fileName = path.basename(frame.getFileName());
      // const pathName = frame[1].getFileName();
      const lineNumber: number = frame.getLineNumber();

      // return console.info.bind(console, info(filename + ':' + lineNumber, '%s'));
      // return console.info.bind(console, info('%s ' + pathName + ':' + lineNumber));
      return console.info.bind(console, info('%s ' + fileName + ':' + lineNumber));

    } else {
      return noop;
    }
  }

  get warn() {

    if (this.config.isDebugMode) {

      const frame = stackTrace.get()[1];
      const fileName = path.basename(frame.getFileName());
      const lineNumber: number = frame.getLineNumber();

      return console.warn.bind(console, warn('%s ' + fileName + ':' + lineNumber));

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

// https://github.com/felixge/node-stack-trace
// https://stackoverflow.com/questions/14172455/get-name-and-line-of-calling-function-in-node-js/14172822

/*

      if (lineNumber) {
        lineNumber -= 4;
      }

*/

/*

private getFilenameAndLineNumber(): string {

  const frame = stackTrace.get()[1];
  const file = path.basename(frame.getFileName());
  const line = frame.getLineNumber();
  // const method = frame.getFunctionName();

  return file + ':' + line;

}

*/
