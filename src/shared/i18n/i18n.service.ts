import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService as I18nServiceLib } from 'nestjs-i18n';
import { I18nPath } from '~/common/types/i18n.generated';
import { II18nService } from './i18n.interface';

@Injectable()
export class I18nService implements II18nService {
  constructor(private readonly i18n: I18nServiceLib) {}

  t<T = string>(key: I18nPath, options?: Record<string, any>): T {
    const lang = I18nContext.current().lang;
    return this.i18n.translate(key, {
      lang,
      ...options,
    }) as T;
  }
}
