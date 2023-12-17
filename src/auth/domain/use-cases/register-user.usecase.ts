import { User } from '@/users/domain/entities';


export interface UserToken {
  token: string;
  user: User;
}


export interface RegisterUser {

  run(user: object): Promise<UserToken>;

}
