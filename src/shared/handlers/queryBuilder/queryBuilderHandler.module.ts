import { Module } from '@nestjs/common';
import { QueryBuilderHandlerService } from './queryBuilderHandler.service';

@Module({
  providers: [QueryBuilderHandlerService],
  exports: [QueryBuilderHandlerService],
})
export class QueryBuilderHandlerModule {}
