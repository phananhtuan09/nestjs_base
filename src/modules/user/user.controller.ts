import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, GetUsersDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParseIdParam } from '~/common/decorators/param.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query() filters: GetUsersDto) {
    return await this.userService.getUsers(filters);
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return await this.userService.createUser(userData);
  }

  @Put(':id')
  async updateUser(
    @ParseIdParam() id: number,
    @Body() updateData: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateData);
  }

  @Delete(':id')
  async deleteUser(@ParseIdParam() id: number) {
    return await this.userService.deleteUser(id);
  }
}
