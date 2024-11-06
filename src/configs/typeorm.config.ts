import * as path from 'path';
import { getEnvValue, isDev } from '../common/utils/env.util';
import { ConfigType, registerAs } from '@nestjs/config';

export const databaseRegToken = 'database';

export const typeOrmConfig = {
  type: 'mysql',
  database: getEnvValue<string>('DATABASE_NAME', 'string'),
  username: getEnvValue<string>('DATABASE_USERNAME', 'string'),
  password: getEnvValue<string>('DATABASE_PASSWORD', 'string'),
  port: getEnvValue<number>('DATABASE_PORT', 'number', 3306),
  synchronize: getEnvValue<boolean>('DATABASE_SYNCHRONIZE', 'boolean', false),
  migrationsRun: false,
  entities: [
    path.join(__dirname, '..', 'shared', 'entities', '**', '*.entity.{ts,js}'),
  ],
  migrations: [path.join(__dirname, '..', 'migrations', '*.*')],
  logging: isDev(),
};

export const databaseConfig = registerAs(databaseRegToken, () => ({
  ...typeOrmConfig,
}));

export type DatabaseConfigType = ConfigType<typeof databaseConfig>;
