import { GenerateAuthToken } from '@/auth/domain/use-cases';
import { HandleAuthToken } from './handle-auth-token.usecase';


export class AuthTokenGenerator implements GenerateAuthToken {

  constructor(private readonly authTokenHandler: HandleAuthToken) {}


  async run(payload: { id: string }, duration: string): Promise<string> {
    const token = await this.authTokenHandler.generateToken(
      { id: payload.id },
      duration
    );
    if (!token) throw new Error('Something went wrong while creating JWT');

    return token;
  }

}
