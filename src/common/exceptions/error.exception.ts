import { HttpException, HttpStatus } from '@nestjs/common';
import { CodeResponse, StatusResponse } from '../types/response/common.type';
import { isTypeOrmError } from '~/common/utils/helper.util';

export class ErrorHttpException extends HttpException {
  constructor(message: string, error: any = null, status?: HttpStatus) {
    const responseData = ErrorHttpException.createResponse(message, error);
    super(responseData, status || responseData.statusCode);
  }

  private static createResponse(message: string, error: any) {
    let code = CodeResponse.SERVER_UNEXPECTED_ERROR;
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (isTypeOrmError(error)) {
      code = CodeResponse.DATABASE_QUERY_FAILED;
      statusCode = HttpStatus.BAD_REQUEST;
    }

    return {
      message,
      code,
      status: StatusResponse.failed,
      error,
      statusCode,
    };
  }
}
