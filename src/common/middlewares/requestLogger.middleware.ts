import { Injectable, NestMiddleware, Inject, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getEnvValue } from '../utils/env.util';
import { Logger } from 'winston';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(@Inject('Logger') private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction): void {
    let responseBody: any;

    const originalSend = res.send.bind(res);
    res.send = function (body: any) {
      responseBody = body;
      return originalSend(body);
    };

    const { method, baseUrl, body, query } = req;

    const enableWriteLog = getEnvValue<boolean>(
      'APP_ENABLE_WRITE_REQUEST_LOG',
      'boolean',
      false,
    );

    res.on('finish', () => {
      if (!baseUrl.includes('/api') || !enableWriteLog) {
        return;
      }
      const { statusCode } = res;

      const logData = {
        method,
        url: baseUrl,
        body,
        query,
        response: responseBody,
      };

      if (
        statusCode >= HttpStatus.BAD_REQUEST ||
        !JSON.parse(responseBody ?? {})?.status
      ) {
        this.logger.error({
          prefix: 'response',
          _message: logData,
        });
      } else {
        this.logger.info({
          prefix: 'response',
          _message: logData,
        });
      }
    });

    next();
  }
}
