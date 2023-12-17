import { RegisterUser, UserLike, UserToken } from '@/auth/domain/use-cases';
import { User } from '@/users/domain/entities';
import { UserRepository } from '@/users/domain/repositories';


export class UserRegistrator implements RegisterUser {

  ///* DI
  constructor(private readonly userRepository: UserRepository) {}


  async run(userLike: UserLike): Promise<UserToken> {
    ///* create user to register DomainEvents
    const user = User.create(userLike);

    const newUser: User = await this.userRepository.create(user);

    return {
      token: '',
      user: newUser,
    };
  }

}
