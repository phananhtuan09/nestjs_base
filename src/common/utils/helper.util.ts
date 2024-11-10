import { isDev } from './env.util';

export function isObject(obj: any) {
  return obj != null && obj?.constructor?.name === 'Object';
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
