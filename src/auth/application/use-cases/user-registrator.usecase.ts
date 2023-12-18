import {
  GenerateAuthToken,
  RegisterUser,
  UserLike,
  UserToken,
} from '@/auth/domain/use-cases';
import { JwtConstants } from '@/shared/application/constants';
import { CreateUser } from '@/users/domain/use-cases';


export class UserRegistrator implements RegisterUser {

  ///* DI
  constructor(
    private readonly userCreator: CreateUser,
    private readonly authTokenGenerator: GenerateAuthToken
  ) {}


  async run(userLike: UserLike): Promise<UserToken> {
    ///* create user
    const user = await this.userCreator.run(userLike);

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
