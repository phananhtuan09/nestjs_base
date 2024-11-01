import { Repository } from 'typeorm';
import { User } from '~/shared/entities/user.entity';
import { UserInterfaceRepository } from '../interfaces/user.interface';
import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements UserInterfaceRepository
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
