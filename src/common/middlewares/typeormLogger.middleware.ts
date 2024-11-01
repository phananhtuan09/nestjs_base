import { AbstractLogger, LogLevel, LogMessage } from 'typeorm';
import logger from '~/configs/logger.config';

export class TypeOrmLogger extends AbstractLogger {
  /**
   * Write log to specific output.
   */
  protected writeLog(level: LogLevel, logMessage: LogMessage | LogMessage[]) {
    const messages = this.prepareLogMessages(logMessage, {
      highlightSql: false,
      appendParameterAsComment: true,
    });

    for (const message of messages) {
      const typeLog = message.type ?? level;
      const formatMessage = {
        prefix: 'database-' + typeLog,
        _message: message?.message,
      };
      if (typeLog == 'warn' || typeLog == 'query-slow') {
        logger.warn(formatMessage);
      } else if (typeLog == 'error' || typeLog == 'query-error') {
        logger.error(formatMessage);
      } else {
        logger.info(formatMessage);
      }
    }
  }
}
