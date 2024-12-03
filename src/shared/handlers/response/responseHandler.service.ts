import { Injectable } from '@nestjs/common';
import {
  CommonResponse,
  StatusResponse,
  CodeResponse,
  ResponseDataErrorOrFailed,
} from '~/common/types/response/common.type';
import { DEFAULT_RESPONSE } from '~/common/constants/common.const';
import { IResponseHandlerService } from './responseHandler.interface';

@Injectable()
export class ResponseHandlerService implements IResponseHandlerService {
  public success<TData = any>(
    data: TData,
    message: string,
  ): CommonResponse<TData> {
    return {
      ...DEFAULT_RESPONSE,
      data,
      message,
      status: StatusResponse.success,
    };
  }

  public error(
    message: string,
    error?: any,
    code?: CodeResponse,
    status?: StatusResponse,
  ): CommonResponse<ResponseDataErrorOrFailed> {
    return {
      ...DEFAULT_RESPONSE,
      message,
      data: error || null,
      status: status || StatusResponse.error,
      code: code || CodeResponse.SERVER_UNEXPECTED_ERROR,
    };
  }
}
