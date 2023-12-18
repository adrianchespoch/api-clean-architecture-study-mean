import { Nullable } from '@/shared/domain';
import { User } from '@/users/domain/entities';


export interface ValidateAuthToken {

  run(bearerToken: string): Promise<Nullable<User>>;

}
