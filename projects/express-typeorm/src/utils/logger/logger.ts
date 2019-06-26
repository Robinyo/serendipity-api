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
      return console.info.bind(console);
    } else {
      return noop;
    }
  }

  get warn() {
    if (this.config.isDebugMode) {
      return console.warn.bind(console);
    } else {
      return noop;
    }
  }

  get error() {
    if (this.config.isDebugMode) {
      return console.error.bind(console);
    } else {
      return noop;
    }
  }

}

export const logger: Logger = new Logger();
