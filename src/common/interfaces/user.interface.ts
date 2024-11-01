import { BaseInterfaceRepository } from './base.interface';
import { User } from '~/shared/entities/user.entity';

export interface UserInterfaceRepository
  extends BaseInterfaceRepository<User> {}
