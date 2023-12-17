import { User } from '@/users/domain/entities';


export interface CheckAdminPrivileges {

  run(currentUser: User): boolean;

}
