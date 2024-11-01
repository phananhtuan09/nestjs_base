import { Module, Global } from '@nestjs/common';
import { ResponseHandlerService } from './responseHandler.service';

@Global()
@Module({
  providers: [ResponseHandlerService],
  exports: [ResponseHandlerService],
})
export class ResponseHandlerModule {}
