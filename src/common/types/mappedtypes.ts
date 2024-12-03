import { PaginationResponse } from './response/common.type';

export type WrapDataWithPagination<Key extends string, Data> = {
  [K in Key]: Data;
} & {
  pagination: PaginationResponse;
};
