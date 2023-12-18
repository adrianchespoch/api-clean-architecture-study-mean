import { type User, UserProps } from '@/users/domain/entities';


export type UserLike = UserProps & object;


export interface CreateUser {

  run(userLike: UserLike): Promise<User>;

}
