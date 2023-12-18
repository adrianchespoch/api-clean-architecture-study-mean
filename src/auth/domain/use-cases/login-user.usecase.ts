import { LoginDto } from '../dtos';
import { UserToken } from './register-user.usecase';

export interface LoginUser {

  run(loginDto: LoginDto): Promise<UserToken>;

}
