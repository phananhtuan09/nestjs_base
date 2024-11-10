import { ConfigType, registerAs } from '@nestjs/config';
import { getEnvValue } from '~/common/utils/env.util';

export const swaggerRegToken = 'swagger';

export const swaggerConfig = registerAs(swaggerRegToken, () => ({
  enable: getEnvValue<boolean>('SWAGGER_ENABLE', 'boolean', false),
  version: getEnvValue<string>('SWAGGER_VERSION', 'string', '1.0'),
}));

export type SwaggerConfigType = ConfigType<typeof swaggerConfig>;
