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
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('age') age?: number,
  ): Promise<ICommonResponse<User[]>> {
    const filters = {
      name,
      email,
      age: age ? Number(age) : undefined, // Convert age to a number if it's provided
    };
    return await this.userService.getUsers(filters);
  }

  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return await this.userService.createUser(userData);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: Partial<User>,
  ): Promise<void> {
    await this.userService.updateUser(id, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
