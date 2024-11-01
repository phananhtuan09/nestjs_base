import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponseHandlerService } from '~/shared/responseHandler/responseHandler.service';
import { Response } from 'express';
import { DEFAULT_RESPONSE } from '../constants/common.const';
import { isDev } from '../utils/env.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly responseHandler: ResponseHandlerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.getErrorMessage(exception);
    const errors = this.getErrorStack(exception?.response?.errors);

    const errorResponse = this.responseHandler.error(message, errors);

    response.status(status).json(errorResponse);
  }

  private getErrorMessage(exception: any): string {
    if (typeof exception?.message === 'string' && exception.message) {
      return exception.message;
    }
    if (
      typeof exception?.response?.message === 'string' &&
      exception.response.message
    ) {
      return exception.response.message;
    }
    return DEFAULT_RESPONSE.message;
  }

  private getErrorStack(error: any): string | null {
    if (!isDev()) {
      return null;
    }
    if (error?.stack) {
      return error.stack;
    }
    return typeof error?.message === 'string' ? error.message : null;
  }
}
