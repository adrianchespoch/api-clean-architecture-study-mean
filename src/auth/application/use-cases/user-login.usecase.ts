import { LoginDto } from '@/auth/domain/dtos';
import { UnauthorizedError } from '@/auth/domain/errors';
import {
  GenerateAuthToken,
  LoginUser,
  UserToken,
} from '@/auth/domain/use-cases';
import { JwtConstants } from '@/shared/application/constants';
import { UserRepository } from '@/users/domain/repositories';
import { ProcessPassword } from '@/users/domain/use-cases';


export class UserLogin implements LoginUser {

  ///* DI
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordProcessor: ProcessPassword,
    private readonly authTokenGenerator: GenerateAuthToken
  ) {}


  async run(loginDto: LoginDto): Promise<UserToken> {
    // no usecase was created for findOneByEmail 'cause each usecase throws a != exception
    const user = await this.userRepository.findOneByEmail(loginDto.email);
    const passwordsMatched = this.passwordProcessor.compare(
      loginDto.password,
      user?.password ?? ''
    );

    if (!user || !passwordsMatched)
      throw new UnauthorizedError(
        'There was a problem logging in. Check your email and password or create an account.'
      );

    ///* generate JWT
    const token = await this.authTokenGenerator.run(
      { id: user.id! },
      JwtConstants.duration
    );

    return {
      token,
      user,
    };
  }

}
