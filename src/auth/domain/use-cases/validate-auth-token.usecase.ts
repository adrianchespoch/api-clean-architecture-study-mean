import { Nullable } from '@/shared/domain';


export interface ValidateAuthToken {

  validateToken<T>(token: string): Promise<Nullable<T>>;

}
