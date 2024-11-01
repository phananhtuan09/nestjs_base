import { ConfigType, registerAs } from '@nestjs/config';
import { getEnvValue } from '~/common/utils/env.util';

export const appRegToken = 'app';

export const appConfig = registerAs(appRegToken, () => ({
  port: getEnvValue<number>('APP_PORT', 'number', 3000),
  locale: getEnvValue<string>('APP_LOCALE', 'string', 'Asia/Ho_Chi_Minh'),
}));

export type AppConfigType = ConfigType<typeof appConfig>;
