import { Injectable } from '@nestjs/common';
import {
  ICommonResponse,
  ICommonResponseErrors,
  ICommonResponsePagination,
} from '~/common/types/response/common.type';
import { DEFAULT_RESPONSE } from '~/common/constants/common.const';
import { IResponseHandlerService } from './responseHandler.interface';

@Injectable()
export class ResponseHandlerService implements IResponseHandlerService {
  success<TData = any>(
    data: TData,
    message: string,
    pagination?: ICommonResponsePagination,
  ): ICommonResponse<TData> {
    return {
      ...DEFAULT_RESPONSE,
      data,
      message,
      status: true,
      pagination: pagination || null,
    };
  }

  error(
    message: string,
    errors?: ICommonResponseErrors[] | null | string,
  ): ICommonResponse<null> {
    return {
      ...DEFAULT_RESPONSE,
      message,
      errors: errors || null,
    };
  }
}
