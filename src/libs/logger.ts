const isDevelopment = process.env.NODE_ENV === 'development';

interface LoggerOptions {
  prefix?: string;
  timestamp?: boolean;
}

class Logger {
  private prefix: string;
  private timestamp: boolean;

  constructor(options: LoggerOptions = {}) {
    this.prefix = options.prefix || '';
    this.timestamp = options.timestamp ?? true;
  }

  private formatMessage(level: 'info' | 'error', ...args: unknown[]): unknown[] {
    const parts: unknown[] = [];

    if (this.timestamp) {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      parts.push(`[${time}]`);
    }

    if (this.prefix) {
      parts.push(`[${this.prefix}]`);
    }

    parts.push(`[${level.toUpperCase()}]`);
    parts.push(...args);

    return parts;
  }

  info(...args: unknown[]): void {
    if (!isDevelopment) return;
    console.info(...this.formatMessage('info', ...args));
  }

  error(...args: unknown[]): void {
    console.error(...this.formatMessage('error', ...args));
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

