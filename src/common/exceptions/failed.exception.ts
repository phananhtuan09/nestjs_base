import { HttpException, HttpStatus } from '@nestjs/common';
import { CodeResponse, StatusResponse } from '../types/response/common.type';

export class FailedHttpException extends HttpException {
  constructor(
    message: string,
    error: any = null,
    code: CodeResponse = CodeResponse.SERVER_UNEXPECTED_ERROR,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super({ message, code, status: StatusResponse.failed, error }, status);
  }
}
