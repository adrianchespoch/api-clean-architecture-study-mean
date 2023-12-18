import { User } from '@/users/domain/entities';
import { UserAlreadyExistError } from '@/users/domain/errors';
import { UserRepository } from '@/users/domain/repositories';
import { CreateUser, ProcessPassword, UserLike } from '@/users/domain/use-cases';


export class UserCreator implements CreateUser {

  ///* DI
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordProcessor: ProcessPassword
  ) {}


  async run(userLike: UserLike): Promise<User> {
    const userSaved = await this.userRepository.findOneByEmail(userLike.email);
    if (userSaved) throw new UserAlreadyExistError('Email already registered');

    ///* hash password & setup user before persisting
    userLike.password = this.passwordProcessor.hash(userLike.password);

    userLike.state = true;

    ///* create user to register DomainEvents
    const user = User.create(userLike);
    /// usecase (app) is who actually Publish DomainEvents
    // await this.eventBus.publish(course.pullDomainEvents());

    const newUser: User = await this.userRepository.create(user);

    return newUser;
  }

}
