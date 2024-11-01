import {
  ICommonResponse,
  ICommonResponseErrors,
  ICommonResponsePagination,
} from '~/common/types/response/common.type';

export interface IResponseHandlerService {
  success<TData = any>(
    data: TData,
    message: string,
    pagination?: ICommonResponsePagination,
  ): ICommonResponse<TData>;

  error(
    message: string,
    errors?: ICommonResponseErrors[],
  ): ICommonResponse<null>;
}
