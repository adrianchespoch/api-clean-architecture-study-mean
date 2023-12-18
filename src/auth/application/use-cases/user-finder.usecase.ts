import { ResourceNotFoundError } from '@/shared/domain';
import { User } from '@/users/domain/entities';
import { UserRepository } from '@/users/domain/repositories';
import { FindUser } from '../../domain/use-cases/find-user.usecase';


export class UserFinder implements FindUser {

  constructor(private readonly userRepository: UserRepository) {}

  async run(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new ResourceNotFoundError(`User not found with ID: ${id}`);

    return user;
  }

}
