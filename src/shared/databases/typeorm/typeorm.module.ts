import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmLogger } from '~/common/middlewares/typeormLogger.middleware';
import dataSource from './dataSource';
import { getEnvValue } from '~/common/utils/env.util';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        let loggerOptions = getEnvValue('DATABASE_LOGGING', '', false) as any;

        try {
          loggerOptions = JSON.parse(loggerOptions);
        } catch {
          // ignore
        }

        await dataSource.initialize();
        return {
          ...dataSource.options,
          logging: loggerOptions,
          logger: new TypeOrmLogger(loggerOptions),
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
