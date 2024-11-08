import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '~/shared/entities/user.entity';
import { ICommonResponse } from '~/common/types/response/common.type';
import { CreateUserDto, UpdateUserDto, FilterUserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(
    @Query() filters: FilterUserDto,
  ): Promise<ICommonResponse<User[]>> {
    return await this.userService.getUsers(filters);
  }

  @Post()
  async createUser(
    @Body() userData: CreateUserDto,
  ): Promise<ICommonResponse<User>> {
    return await this.userService.createUser(userData);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: UpdateUserDto,
  ): Promise<void> {
    await this.userService.updateUser(id, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
