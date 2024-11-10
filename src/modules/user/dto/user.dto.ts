import { IsString, IsEmail, IsOptional, IsInt, Min } from 'class-validator';
import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';

export class BaseUserDto {
  @IsString()
  @ApiProperty()
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class CreateUserDto extends BaseUserDto {}

export class UpdateUserDto extends PartialType(BaseUserDto) {}

export class FilterUserDto extends PartialType(
  OmitType(BaseUserDto, ['password'] as const),
) {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false })
  age?: number;
}
