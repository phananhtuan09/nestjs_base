import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { Response, ResponsePagination } from '~/shared/model/response.model';
import { BASE_TYPE_NAMES } from '../constants/common.const';
import { RESPONSE_SWAGGER_TEMPLATES } from '../constants/swagger.const';

interface ApiResultOptions<TModel> {
  modelType: TModel | TModel[];
  status?: HttpStatus;
  isPagination?: boolean;
  keyItemData?: string;
}

function generateBaseProperty(type: Type<any>, keyItemData: string) {
  return BASE_TYPE_NAMES.includes(type.name)
    ? { type: type.name.toLowerCase() }
    : {
        type: 'object',
        properties: { [keyItemData]: { $ref: getSchemaPath(type) } },
      };
}

function generateDataValue(
  model: Type<any>,
  isPagination: boolean,
  keyItemData: string,
) {
  if (isPagination) {
    return {
      type: 'object',
      properties: {
        [keyItemData]: {
          type: 'array',
          items: { $ref: getSchemaPath(model) },
        },
        pagination: {
          $ref: getSchemaPath(ResponsePagination),
        },
      },
    };
  }

  return model
    ? generateBaseProperty(model, keyItemData)
    : { type: 'null', default: null };
}

function ApiSuccessResponse<TModel extends Type<any>>(
  options: ApiResultOptions<TModel>,
) {
  const {
    modelType,
    status = HttpStatus.OK,
    isPagination = false,
    keyItemData = 'data',
  } = options;
  const model = Array.isArray(modelType) ? modelType[0] : modelType;
  const dataValue = generateDataValue(model, isPagination, keyItemData);

  return applyDecorators(
    ApiExtraModels(model),
    ApiResponse({
      status,
      description: 'Successful',
      schema: {
        allOf: [
          { $ref: getSchemaPath(Response) },
          {
            properties: {
              data: dataValue,
            },
          },
        ],
      },
    }),
  );
}

function createApiResponse(statusCode: number, template: any) {
  return ApiResponse({
    status: statusCode,
    description: template.description,
    schema: {
      allOf: [
        { $ref: getSchemaPath(Response) },
        {
          properties: {
            status: template.status,
            data: template.data,
            code: template.code,
          },
        },
      ],
    },
  });
}

function ApiErrorResponses(statusCodesNotShow?: number[]) {
  const decorators = Object.keys(RESPONSE_SWAGGER_TEMPLATES).reduce(
    (acc, cur) => {
      const formattedCur = Number(cur);
      if (
        !Array.isArray(statusCodesNotShow) ||
        (statusCodesNotShow?.length &&
          !statusCodesNotShow.includes(formattedCur))
      ) {
        acc.push(
          createApiResponse(
            formattedCur,
            RESPONSE_SWAGGER_TEMPLATES[formattedCur],
          ),
        );
      }
      return acc;
    },
    [],
  );
  return applyDecorators(...decorators);
}

export { ApiSuccessResponse, ApiErrorResponses };
