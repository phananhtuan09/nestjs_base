import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ResponseHandlerService } from '~/shared/responseHandler/responseHandler.service';
import { Response } from 'express';
import { DEFAULT_RESPONSE } from '../constants/common.const';
import { isDev } from '../utils/env.util';
import { Logger } from 'winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly responseHandler: ResponseHandlerService,
    @Inject('Logger') private readonly logger: Logger,
  ) {
    this.catchAllExceptionHook();
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.extractErrorMessage(exception);
    const errors = this.extractErrorStack(exception?.response?.errors);

    const errorResponse = this.responseHandler.error(message, errors);

    response.status(status).json(errorResponse);
  }

  private extractErrorMessage(exception: any): string {
    if (typeof exception?.message === 'string') {
      return exception.message;
    }
    if (typeof exception?.response?.message === 'string') {
      return exception.response.message;
    }
    return DEFAULT_RESPONSE.message;
  }

  private extractErrorStack(error: any): string | null {
    if (!isDev()) {
      return null;
    }
    if (error?.stack) {
      return error.stack;
    }
    if (typeof error?.message === 'string') {
      return error.message;
    }
    return null;
  }

  private catchAllExceptionHook() {
    process.on('uncaughtException', (err) => {
      if (isDev()) {
        console.error('Uncaught Exception:', err);
      }
      this.logger.error('Uncaught Exception:', err);
    });
    process.on('unhandledRejection', (reason) => {
      if (isDev()) {
        console.error('Unhandled Rejection:', reason);
      }
      this.logger.error('Unhandled Rejection:', reason);
    });
  }
}
