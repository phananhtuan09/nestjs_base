import {
  CommonResponse,
  ResponseDataErrorOrFailed,
} from '~/common/types/response/common.type';

export interface IResponseHandlerService {
  success<TData = any>(data: TData, message: string): CommonResponse<TData>;
  error(
    message: string,
    errors?: any,
  ): CommonResponse<ResponseDataErrorOrFailed>;
}
