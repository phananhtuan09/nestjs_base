export type BaseType = boolean | number | string | undefined;

type TTypeValue = 'boolean' | 'string' | 'number' | '';

function formatValue<T extends BaseType = string>(
  key: string,
  defaultValue: T,
  type?: TTypeValue,
) {
  const value: string | undefined = process.env[key];
  if (typeof value === 'undefined') {
    return defaultValue;
  }

  if (type === 'boolean') {
    return (value === 'true' ? true : defaultValue) as T;
  }
  if (type === 'number') {
    const parseNum = Number(value);
    return (!isNaN(parseNum) ? parseNum : defaultValue) as T;
  }
  return value as unknown as T;
}

export function getEnvValue<T extends BaseType = string>(
  key: string,
  type?: TTypeValue,
  defaultValue?: T,
) {
  if (defaultValue === undefined) {
    switch (type) {
      case 'boolean':
        defaultValue = false as T;
        break;
      case 'number':
        defaultValue = 0 as T;
        break;
      default:
        defaultValue = '' as T;
        break;
    }
  }
  return formatValue<T>(key, defaultValue, type);
}

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}
