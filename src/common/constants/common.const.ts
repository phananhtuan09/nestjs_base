import { ICommonResponse } from '../types/response/common.type';

export const DEFAULT_RESPONSE: ICommonResponse<null> = {
  status: false,
  message: 'An unexpected error occurred',
  data: null,
  pagination: null,
  errors: null,
};
