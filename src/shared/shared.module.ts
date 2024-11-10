import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './databases/typeorm/typeorm.module';
import { ResponseHandlerModule } from './responseHandler/responseHandler.module';
import { I18nModule } from './i18n/i18n.module';

@Module({
  imports: [LoggerModule, DatabaseModule, ResponseHandlerModule, I18nModule],
  exports: [LoggerModule, DatabaseModule, ResponseHandlerModule, I18nModule],
})
export class SharedModule {}
