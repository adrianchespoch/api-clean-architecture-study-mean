import { User } from '@/users/domain/entities';


export interface FindUser {

  run(id: string): Promise<User>;

}
