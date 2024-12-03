import { PaginationTypeORMOptions } from './interface';
import { DEFAULT_RESPONSE_PAGINATION } from '~/common/constants/common.const';
import { convertToNumber } from '~/common/utils/helper.util';
import { PaginationResponse } from '~/common/types/response/common.type';

export function paginate(
  page: number | string = DEFAULT_RESPONSE_PAGINATION.page,
  pageSize: number | string = DEFAULT_RESPONSE_PAGINATION.pageSize,
): PaginationTypeORMOptions {
  const formattedPage = convertToNumber(page);
  const formattedPageSize = convertToNumber(pageSize);

  const responsePage = {
    page: formattedPage ?? DEFAULT_RESPONSE_PAGINATION.page,
    pageSize: formattedPageSize ?? DEFAULT_RESPONSE_PAGINATION.pageSize,
  };

  if (
    formattedPage === null ||
    formattedPageSize === null ||
    formattedPageSize <= 0
  ) {
    // No pagination
    return {
      skip: 0,
      take: 0,
      ...responsePage,
    };
  }

  const skip = (formattedPage - 1) * formattedPageSize;

  return {
    skip: skip > 0 ? skip : 0,
    take: formattedPageSize,
    ...responsePage,
  };
}

export function responsePagination(
  page: number,
  pageSize: number,
  totalItems: number,
): PaginationResponse {
  if (pageSize <= 0) {
    return {
      page,
      pageSize,
      totalPages: DEFAULT_RESPONSE_PAGINATION.totalPages,
      totalItems,
    };
  }

  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    page,
    pageSize,
    totalPages,
    totalItems,
  };
}
