import { ValidationError, BadRequestException } from '@nestjs/common';

export function validationExceptionFactory(
  errors: ValidationError[],
): BadRequestException {
  const formattedErrors = errors
    .map((error) =>
      Object.keys(error.constraints).map((constraint) => ({
        rule: constraint,
        property: error.property,
        message: error.constraints[constraint],
      })),
    )
    .flat();
  console.log({ errors, formattedErrors });
  return new BadRequestException(formattedErrors);
}
