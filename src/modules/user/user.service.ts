import { Injectable, HttpStatus } from '@nestjs/common';
import { Like } from 'typeorm';
import { UserRepository } from '~/common/repositories/user.repository';
import { ResponseHandlerService } from '~/shared/handlers/response/responseHandler.service';
import { CreateUserDto, UpdateUserDto, GetUsersDto } from './dto/user.dto';
import { I18nService } from '~/shared/i18n/i18n.service';
import { I18nReturnType } from '~/shared/i18n/i18n.interface';
import { ErrorHttpException } from '~/common/exceptions/error.exception';
import { FailedHttpException } from '~/common/exceptions/failed.exception';
import { CodeResponse } from '~/common/types/response/common.type';
import { QueryBuilderHandlerService } from '~/shared/handlers/queryBuilder/queryBuilderHandler.service';
import { User } from '~/shared/entities/user.entity';
import { WhereType } from '~/shared/handlers/queryBuilder/queryBuilderHandler.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly responseHandler: ResponseHandlerService,
    private readonly i18nService: I18nService,
    private readonly queryBuilderHandler: QueryBuilderHandlerService<User>,
  ) {}

  async createUser(userData: CreateUserDto) {
    const existedUser = await this.userRepository.findOne({
      where: [{ email: userData.email }, { username: userData.username }],
    });
    if (existedUser) {
      throw new FailedHttpException(
        this.i18nService.t<I18nReturnType<'user.error.userHasExisted'>>(
          'user.error.userHasExisted',
        ),
        null,
        CodeResponse.USER_HAS_EXISTED,
        HttpStatus.CONFLICT,
      );
    }
    try {
      const user = this.userRepository.create(userData);
      const savedUser = await this.userRepository.save(user);
      return this.responseHandler.success(
        {
          user: savedUser,
        },
        this.i18nService.t<I18nReturnType<'user.success.userCreated'>>(
          'user.success.userCreated',
        ),
      );
    } catch (error) {
      throw new ErrorHttpException(
        this.i18nService.t<I18nReturnType<'user.error.userCreated'>>(
          'user.error.userCreated',
        ),
        error,
      );
    }
  }

  async getUsers(filters: GetUsersDto) {
    try {
      const { data, pagination } = await this.userRepository.findMany(
        {
          where: {
            ...(filters.email ? { email: Like(`%${filters.email}%`) } : null),
            ...(filters.username
              ? { username: Like(`%${filters.username}%`) }
              : null),
          },
        },
        {
          page: filters.page,
          pageSize: filters.pageSize,
        },
      );

      return this.responseHandler.success(
        {
          users: data,
          pagination,
        },
        this.i18nService.t<I18nReturnType<'user.success.userRetrieved'>>(
          'user.success.userRetrieved',
        ),
      );
    } catch (error) {
      throw new ErrorHttpException(
        this.i18nService.t<I18nReturnType<'user.error.userRetrieved'>>(
          'user.error.userRetrieved',
        ),
        error,
      );
    }
  }

  async updateUser(id: number, updateData: UpdateUserDto) {
    const userUpdated = await this.userRepository.findOneById(id);
    if (!userUpdated) {
      throw new FailedHttpException(
        this.i18nService.t<I18nReturnType<'user.error.userNotFound'>>(
          'user.error.userNotFound',
        ),
        null,
        CodeResponse.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    const conditionCheckExist = [];
    if (updateData.email) {
      conditionCheckExist.push({
        field: 'user.email',
        name: 'email',
        value: updateData.email,
        operator: '=',
        typeWhere: WhereType.OR_WHERE,
      });
    }
    if (updateData.username) {
      conditionCheckExist.push({
        field: 'user.username',
        name: 'username',
        value: updateData.username,
        operator: '=',
        typeWhere: WhereType.OR_WHERE,
      });
    }
    if (conditionCheckExist.length > 0) {
      const userQueryBuilder = this.userRepository.createQueryBuilder('user');
      userQueryBuilder.where('user.id != :id', { id });
      this.queryBuilderHandler.handle(userQueryBuilder, {
        AND: conditionCheckExist,
      });
      const existedUser = await userQueryBuilder.getOne();
      if (existedUser) {
        throw new FailedHttpException(
          this.i18nService.t<I18nReturnType<'user.error.userHasExisted'>>(
            'user.error.userHasExisted',
          ),
          null,
          CodeResponse.USER_HAS_EXISTED,
          HttpStatus.CONFLICT,
        );
      }
    }

    try {
      await this.userRepository.update(id, updateData);
      return this.responseHandler.success(
        {
          user: {
            ...userUpdated,
            ...updateData,
          },
        },
        this.i18nService.t<I18nReturnType<'user.success.userUpdated'>>(
          'user.success.userUpdated',
        ),
      );
    } catch (error) {
      throw new ErrorHttpException(
        this.i18nService.t<I18nReturnType<'user.error.userUpdated'>>(
          'user.error.userUpdated',
        ),
        error,
      );
    }
  }

  async deleteUser(id: number) {
    const userDeleted = await this.userRepository.findOneById(id);
    if (!userDeleted) {
      throw new FailedHttpException(
        this.i18nService.t<I18nReturnType<'user.error.userNotFound'>>(
          'user.error.userNotFound',
        ),
        null,
        CodeResponse.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      await this.userRepository.delete(id);
      return this.responseHandler.success(
        true,
        this.i18nService.t<I18nReturnType<'user.success.userDeleted'>>(
          'user.success.userDeleted',
        ),
      );
    } catch (error) {
      throw new ErrorHttpException(
        this.i18nService.t<I18nReturnType<'user.error.userDeleted'>>(
          'user.error.userDeleted',
        ),
        error,
      );
    }
  }
}
