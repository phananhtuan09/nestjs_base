import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '~/shared/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from '~/common/repositories/user.repository';
import { QueryBuilderHandlerModule } from '~/shared/handlers/queryBuilder/queryBuilderHandler.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), QueryBuilderHandlerModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
