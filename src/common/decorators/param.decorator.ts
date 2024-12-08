import { HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { FailedHttpException } from '../exceptions/failed.exception';
import { CodeResponse } from '../types/response/common.type';

export function ParseIdParam() {
  return Param(
    'id',
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      exceptionFactory: () => {
        throw new FailedHttpException(
          'id is invalid',
          null,
          CodeResponse.ID_INVALID,
          HttpStatus.NOT_ACCEPTABLE,
        );
      },
    }),
  );
}
