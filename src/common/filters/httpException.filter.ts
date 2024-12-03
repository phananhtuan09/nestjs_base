import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { ResponseHandlerService } from '~/shared/handlers/response/responseHandler.service';
import { Response } from 'express';
import { isDev } from '../utils/env.util';
import { Logger } from 'winston';
import {
  CodeResponse,
  ResponseDataErrorOrFailed,
  StatusResponse,
} from '~/common/types/response/common.type';
import { I18nService } from '~/shared/i18n/i18n.service';
import { I18nReturnType } from '~/shared/i18n/i18n.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly responseHandler: ResponseHandlerService,
    @Inject('Logger') private readonly logger: Logger,
    private readonly i18nService: I18nService,
  ) {
    this.catchAllExceptionHook();
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof NotFoundException) {
      return this.handleNotFoundException(response);
    }

    const message = this.extractErrorMessage(exception);
    const dataError = this.extractErrorData(exception?.response?.error);

    const errorResponse = this.responseHandler.error(
      message,
      dataError,
      exception?.response?.code,
      exception?.response?.status,
    );

    response.status(status).json(errorResponse);
  }

  private handleNotFoundException(response: Response) {
    const errorResponse = this.responseHandler.error(
      this.i18nService.t<I18nReturnType<'common.error.resource_not_found'>>(
        'common.error.resource_not_found',
      ),
      null,
      CodeResponse.RESOURCE_NOT_FOUND,
      StatusResponse.failed,
    );
    response.status(HttpStatus.NOT_FOUND).json(errorResponse);
  }

  private extractErrorMessage(exception: any): string {
    if (typeof exception?.message === 'string') {
      return this.i18nService.t(exception.message);
    }
    if (typeof exception?.response?.message === 'string') {
      return this.i18nService.t(exception.response.message);
    }
    return this.i18nService.t<I18nReturnType<'common.error.default'>>(
      'common.error.default',
    );
  }

  private extractErrorData(error: any): ResponseDataErrorOrFailed | null {
    if (!isDev()) {
      return null;
    }

    const dataError: ResponseDataErrorOrFailed = {};

    if (error?.stack) {
      dataError.stack = error.stack;
    }

    if (typeof error?.message === 'string') {
      dataError.message = error.message;
    }

    if (Array.isArray(error?.errors)) {
      dataError.errors = error.errors;
    }

    return Object.keys(dataError).length ? dataError : null;
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
