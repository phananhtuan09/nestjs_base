import * as path from 'path';
import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { convertToJSON, isObject } from '~/common/utils/helper.util';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const isString = require('lodash/isString');
import { isDev } from '~/common/utils/env.util';

const devPath = 'src/shared/logs/development/log-%DATE%.log';
const prodPath = 'src/shared/logs/production/log-%DATE%.log';

function convertObjectLogToString(obj: Record<string, any>): string {
  return Object.entries(obj)
    .map(([key, value]) => {
      const stringValue =
        typeof value === 'string' ? value : convertToJSON(value);
      return `${key.charAt(0).toUpperCase() + key.slice(1)}:${stringValue}`;
    })
    .join('\t');
}

function formatLogContext(data: any) {
  const { prefix, _message } = data;
  let msg: string = '';
  if (prefix) {
    msg += `[${prefix}] `;
  }
  if (isObject(_message)) {
    msg += convertObjectLogToString(_message);
  } else if (isString(_message)) {
    msg += _message;
  }
  return msg;
}

function logFormat(timestamp: string, level: string, data: any) {
  let msg = `[${timestamp}] [${level}] `;
  if (isObject(data)) {
    msg += formatLogContext(data);
  } else if (isString(data)) {
    msg += data;
  }
  return msg;
}

const baseConfig = {
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(({ timestamp, level, message }) =>
      logFormat(timestamp, level, message),
    ),
  ),
  transports: [],
};

const devLogger = createLogger({
  ...baseConfig,

  transports: [
    // Console log for development
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message }) =>
          logFormat(timestamp, level, message),
        ),
      ),
    }),

    // Rotate log
    new DailyRotateFile({
      filename: path.resolve(devPath),
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxSize: '1m',
      maxFiles: '14d',
    }),
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      filename: path.resolve(devPath),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '1m',
      maxFiles: '14d',
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      filename: path.resolve(devPath),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '1m',
      maxFiles: '14d',
    }),
  ],
});

const prodLogger = createLogger({
  ...baseConfig,
  transports: [
    // Rotate log
    new DailyRotateFile({
      filename: path.resolve(prodPath),
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxSize: '1m',
      maxFiles: '14d',
    }),
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      filename: path.resolve(prodPath),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '1m',
      maxFiles: '14d',
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      filename: path.resolve(prodPath),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '1m',
      maxFiles: '14d',
    }),
  ],
});

const logger = isDev() ? devLogger : prodLogger;

export default logger;
