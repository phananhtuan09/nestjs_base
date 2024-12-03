import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseInterfaceRepository } from '../interfaces/base.interface';
import { PaginationQueryOptions } from '../types/response/common.type';
import { paginate, responsePagination } from '~/common/paginate';
import { DataWithPagination } from '~/common/paginate/interface';

interface HasId {
  id: string | number;
}

export class BaseRepository<T extends HasId>
  implements BaseInterfaceRepository<T>
{
  private entity: Repository<T>;
  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }

  public async findOne(options: FindOneOptions<T>): Promise<T> {
    return this.entity.findOne(options);
  }

  public async findMany(
    options?: FindManyOptions<T>,
    pagination?: PaginationQueryOptions,
  ): Promise<DataWithPagination<T[]>> {
    const { skip, take, page, pageSize } = paginate(
      pagination?.page,
      pagination?.pageSize,
    );
    const [data, total] = await this.entity.findAndCount({
      ...options,
      skip,
      take: take > 0 ? take : undefined,
    });

    return {
      data,
      pagination: responsePagination(page, pageSize, total),
    };
  }

  public async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };
    return await this.entity.findOneBy(options);
  }

  public async update(id: number, entity: DeepPartial<T>): Promise<void> {
    await this.entity.update(id, entity as any);
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }

  public async delete(id: number): Promise<void> {
    await this.entity.delete(id);
  }
}
