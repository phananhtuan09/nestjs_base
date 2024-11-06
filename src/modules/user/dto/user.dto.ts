import { IsString, IsEmail, IsOptional, IsInt, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

class BaseUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class CreateUserDto extends BaseUserDto {}

export class UpdateUserDto extends PartialType(BaseUserDto) {}

export class FilterUserDto extends PartialType(BaseUserDto) {
  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;
}
