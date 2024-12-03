import { PaginationResponse } from '~/common/types/response/common.type';

export interface PaginationTypeORMOptions {
  skip: number;
  take: number;
  page: number;
  pageSize: number;
}

export interface DataWithPagination<T> {
  data: T;
  pagination: PaginationResponse;
}
