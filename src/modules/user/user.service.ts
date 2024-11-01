import { Injectable, BadRequestException } from '@nestjs/common';
import { Like } from 'typeorm';
import { UserRepository } from '~/common/repositories/user.repository';
import { User } from '~/shared/entities/user.entity';
import { ResponseHandlerService } from '~/shared/responseHandler/responseHandler.service';
import { ICommonResponse } from '~/common/types/response/common.type';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async getUsers(filters?: {
    email?: string;
  }): Promise<ICommonResponse<User[]>> {
    try {
      const where: any = {};

      if (filters.email) {
        where.email = Like(`%${filters.email}%`);
      }

      const users = await this.userRepository.findMany({
        where,
      });

      return this.responseHandler.success(users, 'List user');
    } catch (error) {
      throw new BadRequestException({
        message: 'test2222',
        errors: error,
      });
    }
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<void> {
    await this.userRepository.update(id, updateData);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
