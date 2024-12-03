import { DeepPartial, FindManyOptions, FindOptions } from 'typeorm';
import { DataWithPagination } from '~/common/paginate/interface';

export interface BaseInterfaceRepository<T> {
  create(data: DeepPartial<T>): T;
  findOne(options: FindOptions): Promise<T | undefined>;
  findMany(options?: FindManyOptions<T>): Promise<DataWithPagination<T[]>>;
  findOneById(id: string | number): Promise<T>;
  update(id: number, entity: DeepPartial<T>): Promise<void>;
  delete(id: number): Promise<void>;
  save(data: DeepPartial<T>): Promise<T>;
}
