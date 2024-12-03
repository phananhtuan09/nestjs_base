import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { UserRepository } from '~/common/repositories/user.repository';
import { User } from '~/shared/entities/user.entity';
import { ResponseHandlerService } from '~/shared/handlers/response/responseHandler.service';
import { CommonResponse } from '~/common/types/response/common.type';
import { CreateUserDto, UpdateUserDto, FilterUserDto } from './dto/user.dto';
import { I18nService } from '~/shared/i18n/i18n.service';
import { I18nReturnType } from '~/shared/i18n/i18n.interface';
import { ErrorHttpException } from '~/common/exceptions/error.exception';
import { removeEmptyProperties } from '~/common/utils/helper.util';
import { WrapDataWithPagination } from '~/common/types/mappedtypes';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly responseHandler: ResponseHandlerService,
    private readonly i18nService: I18nService,
  ) {}

  async createUser(userData: CreateUserDto): Promise<CommonResponse<any>> {
    try {
      const user = this.userRepository.create(userData);
      const savedUser = await this.userRepository.save(user);
      return this.responseHandler.success(
        {
          user: savedUser,
        },
        this.i18nService.t<I18nReturnType<'user.success.user_created'>>(
          'user.success.user_created',
        ),
      );
    } catch (error) {
      throw new ErrorHttpException(
        this.i18nService.t<I18nReturnType<'user.error.user_not_created'>>(
          'user.error.user_not_created',
        ),
        error,
      );
    }
  }

  async getUsers(
    filters: FilterUserDto,
  ): Promise<CommonResponse<WrapDataWithPagination<'users', User[]>>> {
    try {
      const formattedFilters = removeEmptyProperties(filters) as FilterUserDto;
      const { data, pagination } = await this.userRepository.findMany(
        {
          where: {
            ...(formattedFilters?.email
              ? { email: Like(`%${formattedFilters.email}%`) }
              : null),
            ...(formattedFilters?.username
              ? { username: Like(`%${formattedFilters.username}%`) }
              : null),
          },
        },
        {
          page: formattedFilters.page,
          pageSize: formattedFilters.pageSize,
        },
      );

      return this.responseHandler.success(
        {
          users: data,
          pagination,
        },
        this.i18nService.t<I18nReturnType<'user.success.user_retrieved'>>(
          'user.success.user_retrieved',
        ),
      );
    } catch (error) {
      throw new ErrorHttpException(
        this.i18nService.t<I18nReturnType<'user.error.user_not_retrieved'>>(
          'user.error.user_not_retrieved',
        ),
        error,
      );
    }
  }

  async updateUser(
    id: number,
    updateData: UpdateUserDto,
  ): Promise<CommonResponse<void>> {
    try {
      await this.userRepository.update(id, updateData);
      return this.responseHandler.success(
        null,
        this.i18nService.t<I18nReturnType<'user.success.user_updated'>>(
          'user.success.user_updated',
        ),
      );
    } catch (error) {
      throw new ErrorHttpException(
        this.i18nService.t<I18nReturnType<'user.error.user_not_updated'>>(
          'user.error.user_not_updated',
        ),
        error,
      );
    }
  }

  async deleteUser(id: number): Promise<CommonResponse<void>> {
    try {
      await this.userRepository.delete(id);
      return this.responseHandler.success(
        null,
        this.i18nService.t<I18nReturnType<'user.success.user_deleted'>>(
          'user.success.user_deleted',
        ),
      );
    } catch (error) {
      throw new ErrorHttpException(
        this.i18nService.t<I18nReturnType<'user.error.user_not_deleted'>>(
          'user.error.user_not_deleted',
        ),
        error,
      );
    }
  }
}
