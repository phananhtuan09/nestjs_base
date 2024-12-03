import { Global, Module } from '@nestjs/common';
import { I18nService } from './i18n.service';
import {
  I18nModule as NestI18nModule,
  QueryResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import * as path from 'path';

@Global()
@Module({
  imports: [
    NestI18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '../../locales/'),
        watch: true,
      },
      typesOutputPath: path.join(
        __dirname,
        '../../../src/common/types/i18n.generated.ts',
      ),
      resolvers: [
        new QueryResolver(['lang']),
        new HeaderResolver(['x-custom-lang']),
      ],
    }),
  ],
  providers: [I18nService],
  exports: [I18nService],
})
export class I18nModule {}
