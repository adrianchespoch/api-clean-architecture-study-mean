import { UserAlreadyExistError } from '@/auth/domain/errors';
import {
  GenerateAuthToken,
  ProcessPassword,
  RegisterUser,
  UserLike,
  UserToken,
} from '@/auth/domain/use-cases';
import { JwtConstants } from '@/shared/application/constants';
import { User } from '@/users/domain/entities';
import { UserRepository } from '@/users/domain/repositories';

export class UserRegistrator implements RegisterUser {
  ///* DI
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordProcessor: ProcessPassword,
    private readonly authTokenGenerator: GenerateAuthToken
  ) {}

  async run(userLike: UserLike): Promise<UserToken> {
    const userSaved = await this.userRepository.findOneByEmail(userLike.email);
    if (userSaved) throw new UserAlreadyExistError('Email already registered');

    ///* hash password & setup user before to persist
    userLike.password = this.passwordProcessor.hash(userLike.password);

    userLike.state = true;

    ///* create user to register DomainEvents
    const user = User.create(userLike);
    /// usecase (app) is who actually Publish DomainEvents
    // await this.eventBus.publish(course.pullDomainEvents());

    const newUser: User = await this.userRepository.create(user);

    ///* generate JWT
    const token = await this.authTokenGenerator.run(
      { id: newUser.id! },
      JwtConstants.duration
    );

    return {
      token,
      user: newUser,
    };
  }
}
