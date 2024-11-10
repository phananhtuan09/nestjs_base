import { I18nPath, I18nTranslations } from '../../common/types/i18n.generated';

export interface II18nService {
  t<T = string>(key: I18nPath, options?: Record<string, any>): T;
}

export type I18nReturnType<T extends I18nPath> =
  T extends keyof I18nTranslations ? I18nTranslations[T] : never;
