import { Nullable } from '@/shared/domain';
import { User } from '../entities';

export interface UserRepository {
  findAll(): Promise<User[]>;

  findOne(id: string): Promise<Nullable<User>>;

  findOneByEmail(email: string): Promise<Nullable<User>>;

  create(user: User): Promise<User>;

  update(id: string, user: User): Promise<User>;

  delete(id: string): Promise<boolean>;
}
