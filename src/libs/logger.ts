const isProd = process.env.NODE_ENV === 'production';
const SHEET_STORE_NAME=process.env.SHEET_STORE_NAME
const LOG_URL=process.env.LOG_URL

interface LoggerOptions {
  prefix?: string;
  timestamp?: boolean;
}

interface LogPayload {
  level: 'info' | 'error';
  sheetName: string;
  message: string;
  context: unknown;
}

class Logger {
  private prefix: string;
  private timestamp: boolean;

  constructor(options: LoggerOptions = {}) {
    this.prefix = options.prefix || '';
    this.timestamp = options.timestamp ?? true;
  }

  private getTime(){
    return new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
  private formatMessage(level: 'info' | 'error', ...args: unknown[]): unknown[] {
    const parts: unknown[] = [];

    if (this.timestamp) {
      const time = this.getTime();
      parts.push(`[${time}]`);
    }

    if (this.prefix) {
      parts.push(`[${this.prefix}]`);
    }

    parts.push(`[${level.toUpperCase()}]`);
    parts.push(...args);

    if(isProd && level === 'error'){
      this.transferToStore({level: 'error', message: parts.join(' '), context: args});
    }
    return parts;
  }

  info(...args: unknown[]): void {
    if (isProd) return;
    console.info(...this.formatMessage('info', ...args));
  }

  error(...args: unknown[]): void {
    console.error(...this.formatMessage('error', ...args));
  }

  transferToStore(props: {level: 'info' | 'error', message: string, context?: unknown}): void {
  if (!isProd) return;
    const {message, context = {}, level} = props
    const payload:LogPayload = {
      context,
      level,
      sheetName: SHEET_STORE_NAME,
      message: `[${this.getTime()}] ${message}`,
    }
    // store in sheets
   try {
    fetch(LOG_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
   } catch (error) {
    this.error(`Error transferring to store: ${error}`);
   }
  }

  // Create a scoped logger with a prefix
  scope(prefix: string): Logger {
    return new Logger({
      prefix: this.prefix ? `${this.prefix}:${prefix}` : prefix,
      timestamp: this.timestamp,
    });
  }
}

// Default logger instance
const logger = new Logger();

export default logger;
export { Logger };

