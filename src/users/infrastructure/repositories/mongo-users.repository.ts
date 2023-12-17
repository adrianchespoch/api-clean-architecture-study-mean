import { Nullable } from '@/shared/domain';
import { User } from '@/users/domain/entities';
import { UserRepository } from '@/users/domain/repositories';
import UserModel from '../persistence/mongo/UserModel';

export class MongoUsersRepository implements UserRepository {
  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<Nullable<User>> {
    throw new Error('Method not implemented.');
  }

  async findOneByEmail(email: string): Promise<Nullable<User>> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    return user as any;
  }

  async create(user: User): Promise<User> {
    const newUser = new UserModel(user);
    await newUser.save();

    return newUser as any;
  }

  update(id: string, user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
