export interface ICommonResponseErrors {
  message: string;
  field?: string;
  code?: string;
}

export interface ICommonResponsePagination {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface ICommonResponse<TData = any> {
  status: boolean;
  message: string;
  data: null | TData;
  errors?: null | ICommonResponseErrors[] | string;
  pagination?: ICommonResponsePagination | null;
}
