export interface ValidateErrors {
  message: string;
  property: string;
  rule: string;
}

export interface ResponseDataErrorOrFailed {
  stack?: string;
  message?: string;
  errors?: ValidateErrors[];
}

export interface PaginationResponse {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginationQueryOptions {
  page?: number | string;
  pageSize?: number | string;
}

export enum StatusResponse {
  success = 'success',
  error = 'error',
  failed = 'failed',
}

export enum CodeResponse {
  SERVER_UNEXPECTED_ERROR = 'server_unexpected_error',
  AUTHORIZATION_FAILED = 'authorization_failed',
  AUTHENTICATED_FAILED = 'authenticated_failed',
  RESOURCE_NOT_FOUND = 'resource_not_found',
  REQUEST_VALIDATION_FAILED = 'request_validation_failed',
  DATABASE_QUERY_FAILED = 'database_query_failed',
}

export interface CommonResponse<TData = any> {
  status: StatusResponse;
  message: string;
  data: TData | null;
  code: CodeResponse | null;
}
