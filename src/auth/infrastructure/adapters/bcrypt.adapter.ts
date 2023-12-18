import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

import { ProcessPassword } from '@/users/domain/use-cases';


export class BcryptAdapter implements ProcessPassword {

  hash(password: string): string {
    const salt = genSaltSync();
    return hashSync(password, salt);
  }

  compare(password: string, hashed: string): boolean {
    return compareSync(password, hashed);
  }

}
