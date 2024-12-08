import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import {
  PartialType,
  OmitType,
  ApiProperty,
  IntersectionType,
} from '@nestjs/swagger';
import { PaginationDto } from '~/common/dto/common.dto';
export class BaseUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class CreateOrUpdateDto extends BaseUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, { context: { max: 20 } })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(100, { context: { max: 100 } })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255, { context: { max: 255 } })
  password: string;
}

export class CreateUserDto extends CreateOrUpdateDto {}

export class UpdateUserDto extends PartialType(CreateOrUpdateDto) {}

export class GetUsersDto extends IntersectionType(
  PartialType(OmitType(BaseUserDto, ['password'] as const)),
  PaginationDto,
) {
  @ApiProperty({ required: false })
  email?: string;
}
