import { isDev } from './env.util';
import { TypeOrmErrorCodes } from '../constants/common.const';

export function isObject(value: any) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function convertToJSON(value: any) {
  const seen = new WeakSet();
  function replacer(key, val) {
    // Handle BigInt conversion
    if (typeof val === 'bigint') {
      return val.toString(); // Convert BigInt to string
    }

    // Handle Maps
    if (val instanceof Map) {
      return Array.from(val.entries()); // Convert Map to array of entries
    }

    // Handle Circular references
    if (val !== null && typeof val === 'object') {
      if (seen.has(val)) {
        return; // Ignore circular references
      }
      seen.add(val); // Mark this object as seen
    }

    return val;
  }
  try {
    return JSON.stringify(value, replacer);
  } catch (error) {
    if (isDev()) {
      console.error('Error converting to JSON:', error);
    }
    return null;
  }
}

export function isTypeOrmError(error: any): boolean {
  if (!error?.stack) {
    return false;
  }
  const errorCodes = Object.values(TypeOrmErrorCodes);
  return errorCodes.some((code) => error.stack?.includes(code));
}

export function removeEmptyProperties(obj: any): any {
  if (Array.isArray(obj)) {
    return obj
      .map(removeEmptyProperties)
      .filter((v) => v !== null && v !== undefined && v !== '');
  } else if (isObject(obj)) {
    return Object.fromEntries(
      Object.entries(obj)
        .map(([key, value]) => [key, removeEmptyProperties(value)])
        .filter(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, value]) => value !== null && value !== undefined && value !== '',
        ),
    );
  }
  return obj;
}

export function convertToNumber(value: any): number | null {
  const number = Number(value);
  return !isNaN(number) ? number : null;
}

export function isNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value);
}
