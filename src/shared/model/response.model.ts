import { ApiProperty } from '@nestjs/swagger';
import {
  CodeResponse,
  StatusResponse,
} from '~/common/types/response/common.type';

export class Response<TData = any> {
  @ApiProperty({ type: 'string', enum: StatusResponse })
  status: StatusResponse;

  @ApiProperty({ type: 'string' })
  message: string;

  @ApiProperty({ type: 'object', properties: {} })
  data: TData | null;

  @ApiProperty({ type: 'string', enum: CodeResponse, default: null })
  code: CodeResponse | null;
}

export class ResponsePagination {
  @ApiProperty({ type: 'number', default: 0 })
  page: number;
  @ApiProperty({ type: 'number', default: 0 })
  pageSize: number;
  @ApiProperty({ type: 'number', default: 0 })
  totalItems: number;
  @ApiProperty({ type: 'number', default: 0 })
  totalPages: number;
}
