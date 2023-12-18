import { UnauthorizedError } from '@/auth/domain/errors';
import { FindUser, ValidateAuthToken } from '@/auth/domain/use-cases';
import { Nullable } from '@/shared/domain';
import { User } from '@/users/domain/entities';
import { HandleAuthToken } from './handle-auth-token.usecase';



export class AuthTokenValidator implements ValidateAuthToken {

  constructor(
    private readonly authTokenHandler: HandleAuthToken,
    private readonly userFinder: FindUser
  ) {}


  async run(bearerToken: string): Promise<Nullable<User>> {
    if (!bearerToken || !bearerToken.startsWith('Bearer '))
      throw new UnauthorizedError('Unauthorized');

    const jwt = bearerToken.split(' ')[1];

    const payload = await this.authTokenHandler.validateToken<{ id: string }>(
      jwt
    );
    if (!payload) throw new UnauthorizedError('Invalid token');

    const user = await this.userFinder.run(payload.id);
    if (!user?.id) return null;

    return user;
  }

}
