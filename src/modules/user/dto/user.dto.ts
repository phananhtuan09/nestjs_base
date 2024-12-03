import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';

export class BaseUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10, {
    context: {
      max: 10,
    },
  })
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class CreateUserDto extends BaseUserDto {}

export class UpdateUserDto extends PartialType(BaseUserDto) {}

export class FilterUserDto extends PartialType(
  OmitType(BaseUserDto, ['password'] as const),
) {
  @IsOptional()
  @ApiProperty({ required: false })
  email?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  page?: number;

  @IsOptional()
  @ApiProperty({ required: false })
  pageSize?: number;
}
