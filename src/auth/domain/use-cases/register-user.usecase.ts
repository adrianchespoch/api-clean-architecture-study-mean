import { type User, UserProps } from '@/users/domain/entities';


export interface UserToken {
  token: string;
  user: User;
}

export type UserLike = UserProps & object;


export interface RegisterUser {

  run(user: UserLike): Promise<UserToken>;

}
