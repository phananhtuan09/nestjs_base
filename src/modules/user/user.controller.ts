import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, GetUsersDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParseIdParam } from '~/common/decorators/param.decorator';
import {
  ApiSuccessResponse,
  ApiErrorResponses,
} from '~/common/decorators/swagger.decorator';
import { User } from '~/shared/entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiSuccessResponse({
    modelType: [User],
    isPagination: true,
    keyItemData: 'users',
  })
  @ApiErrorResponses()
  async getUsers(@Query() filters: GetUsersDto) {
    return await this.userService.getUsers(filters);
  }

  @Post()
  @ApiSuccessResponse({
    modelType: User,
    keyItemData: 'user',
    status: HttpStatus.CREATED,
  })
  @ApiErrorResponses()
  async createUser(@Body() userData: CreateUserDto) {
    return await this.userService.createUser(userData);
  }

  @Put(':id')
  @ApiSuccessResponse({
    modelType: User,
    keyItemData: 'user',
  })
  @ApiErrorResponses()
  async updateUser(
    @ParseIdParam() id: number,
    @Body() updateData: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateData);
  }

  @Delete(':id')
  @ApiSuccessResponse({
    modelType: Boolean,
  })
  @ApiErrorResponses()
  async deleteUser(@ParseIdParam() id: number) {
    return await this.userService.deleteUser(id);
  }
}
