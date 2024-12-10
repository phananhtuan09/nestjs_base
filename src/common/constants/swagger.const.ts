import { HttpStatus } from '@nestjs/common';
import { CodeResponse, StatusResponse } from '../types/response/common.type';

export const SWAGGER_API_ROOT = 'api';
export const SWAGGER_DESCRIPTION = 'API description';
export const SWAGGER_TITLE = 'Nestjs Base API Documentation';
export const SWAGGER_PATH = '/swagger';

export const GLOBAL_PARAMETERS = [
  {
    name: 'lang',
    in: 'query' as const,
    required: false,
  },
  {
    name: 'version',
    in: 'query' as const,
    required: false,
  },
];

export const RESPONSE_SWAGGER_TEMPLATES = {
  [HttpStatus.BAD_REQUEST]: {
    description: 'Bad Request',
    status: {
      type: 'string',
      example: StatusResponse.failed,
    },
    data: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        errors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rule: {
                type: 'string',
              },
              message: {
                type: 'string',
              },
              property: {
                type: 'string',
              },
            },
          },
        },
        stack: {
          type: 'string',
        },
      },
    },
    code: { type: 'string', example: 'string' },
  },
  [HttpStatus.UNAUTHORIZED]: {
    description: 'Unauthorized',
    status: {
      type: 'string',
      example: StatusResponse.failed,
    },
    data: { type: 'null', example: null },
    code: { type: 'string', example: CodeResponse.USER_UNAUTHORIZED },
  },
  [HttpStatus.FORBIDDEN]: {
    description: 'Forbidden',
    status: {
      type: 'string',
      example: StatusResponse.failed,
    },
    data: {
      type: 'null',
      example: null,
    },
    code: { type: 'string', example: 'string' },
  },
  [HttpStatus.INTERNAL_SERVER_ERROR]: {
    description: 'Internal Server Error',
    status: {
      type: 'string',
      example: StatusResponse.error,
    },
    data: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        stack: {
          type: 'string',
        },
      },
    },
    code: { type: 'string', example: 'string' },
  },
};
