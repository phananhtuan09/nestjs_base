import { ValidationError, BadRequestException } from '@nestjs/common';
import { FailedHttpException } from '../exceptions/failed.exception';
import { CodeResponse } from '../types/response/common.type';
import { I18nService } from '~/shared/i18n/i18n.service';
import { I18nTranslations } from '../types/i18n.generated';

export function validationExceptionFactory(
  errors: ValidationError[],
  i18nService: I18nService,
): BadRequestException {
  const formattedErrors = errors
    .map((error) =>
      Object.keys(error.constraints).map((constraint) => {
        const translationKey: keyof I18nTranslations['validation']['rules'] =
          constraint as keyof I18nTranslations['validation']['rules'];
        const context = error?.contexts?.[constraint];
        let translationPath = `validation.rules.${translationKey}`;
        if (context?.translationPath) {
          translationPath = context.translationPath;
        }
        let translatedMessage = i18nService.t(
          translationPath as keyof I18nTranslations,
          {
            args: {
              property: error.property,
              ...error.constraints,
              ...context,
              value: error?.value,
            },
          },
        );

        if (!translatedMessage || translatedMessage === translationPath) {
          translatedMessage = error.constraints[constraint];
        }

        translatedMessage =
          translatedMessage.charAt(0).toUpperCase() +
          translatedMessage.slice(1);

        return {
          rule: constraint,
          property: error.property,
          message: translatedMessage,
        };
      }),
    )
    .flat();
  return new FailedHttpException(
    i18nService.t('common.error.validation_failed'),
    {
      errors: formattedErrors,
    },
    CodeResponse.REQUEST_VALIDATION_FAILED,
  );
}
