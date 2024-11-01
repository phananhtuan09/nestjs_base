import { Module } from '@nestjs/common';
import { LoggerModule } from './Logger/logger.module';
import { DatabaseModule } from './databases/typeorm/typeorm.module';
import { ResponseHandlerModule } from './responseHandler/responseHandler.module';

@Module({
  imports: [LoggerModule, DatabaseModule, ResponseHandlerModule],
  exports: [LoggerModule, DatabaseModule, ResponseHandlerModule],
})
export class SharedModule {}
