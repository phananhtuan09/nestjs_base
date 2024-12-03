import { Transform } from 'class-transformer';
import { removeEmptyProperties } from '../utils/helper.util';

export function RemoveEmptyProperties() {
  return Transform(({ value }) =>
    value ? removeEmptyProperties(value) : value,
  );
}
