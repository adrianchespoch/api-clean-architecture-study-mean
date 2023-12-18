import { User } from '@/users/domain/entities';


type UserDto = Pick<
  User,
  'id' | 'name' | 'surname' | 'email' | 'state' | 'rol'
>;


export class UserResponseDto {

  private constructor(public token: string, public user: UserDto) {}

  static create(object: { [key: string]: any }): UserResponseDto {
    const {
      user: { id, rol, name, surname, email, state },
      token,
    } = object;

    return new UserResponseDto(token, { id, rol, name, surname, email, state });
  }

}
