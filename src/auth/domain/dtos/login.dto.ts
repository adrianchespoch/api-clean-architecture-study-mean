import { InvalidArgumentError } from '@/shared/domain';


export class LoginDto {

  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}


  static create(object: { [key: string]: any }): LoginDto {
    const { email, password } = object;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email))
      throw new InvalidArgumentError('Invalid email format.');
    if (password.length < 3 || password.length > 250)
      throw new InvalidArgumentError(
        'Password should be at least 3 characters.'
      );


    return new LoginDto(email, password);
  }

}
