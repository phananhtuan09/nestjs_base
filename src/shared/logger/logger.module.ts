import { Module } from '@nestjs/common';
import logger from '~/configs/logger.config';

@Module({
  providers: [{ provide: 'Logger', useValue: logger }],
  exports: ['Logger'],
})
export class LoggerModule {}
