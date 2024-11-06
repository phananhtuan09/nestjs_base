import { Injectable, BadRequestException } from '@nestjs/common';
import { Like } from 'typeorm';
import { UserRepository } from '~/common/repositories/user.repository';
import { User } from '~/shared/entities/user.entity';
import { ResponseHandlerService } from '~/shared/responseHandler/responseHandler.service';
import { ICommonResponse } from '~/common/types/response/common.type';
import { CreateUserDto, UpdateUserDto, FilterUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  async createUser(userData: CreateUserDto): Promise<ICommonResponse<User>> {
    try {
      const user = this.userRepository.create(userData);
      const savedUser = await this.userRepository.save(user);
      return this.responseHandler.success(
        savedUser,
        'User created successfully',
      );
    } catch (error) {
      throw new BadRequestException({
        message: 'Failed to create user',
        errors: error,
      });
    }
  }

  async getUsers(filters: FilterUserDto): Promise<ICommonResponse<User[]>> {
    try {
      const where: any = {};

      if (filters.email) {
        where.email = Like(`%${filters.email}%`);
      }
      if (filters.username) {
        where.username = Like(`%${filters.username}%`);
      }
      if (filters.age !== undefined) {
        where.age = filters.age;
      }

      const users = await this.userRepository.findMany({
        where,
      });

      return this.responseHandler.success(users, 'List user');
    } catch (error) {
      throw new BadRequestException({
        message: 'Failed to get users',
        errors: error,
      });
    }
  }

  async updateUser(
    id: number,
    updateData: UpdateUserDto,
  ): Promise<ICommonResponse<void>> {
    try {
      await this.userRepository.update(id, updateData);
      return this.responseHandler.success(null, 'User updated successfully');
    } catch (error) {
      throw new BadRequestException({
        message: 'Failed to update user',
        errors: error,
      });
    }
  }

  async deleteUser(id: number): Promise<ICommonResponse<void>> {
    try {
      await this.userRepository.delete(id);
      return this.responseHandler.success(null, 'User deleted successfully');
    } catch (error) {
      throw new BadRequestException({
        message: 'Failed to delete user',
        errors: error,
      });
    }
  }
}
