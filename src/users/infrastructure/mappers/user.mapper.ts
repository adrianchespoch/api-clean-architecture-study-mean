import { User } from '@/users/domain/entities';
import { UserResponseDto } from '../dtos';


export class UserMapper {

  public static entityToDomainModel(object: { [key: string]: any }): User {
    // new 'cause .create is to emmit domain events

    return new User(
      object.id,
      object.rol,
      object.name,
      object.surname,
      object.email,
      object.password,
      object.state,
      object.avatar,
      object.phone,
      object.birthday,
      object.profession,
      object.description
    );
  }

  public static domainModelToResponseDto(object: {
    [key: string]: any;
  }): UserResponseDto {
    const { user, token } = object;

    return UserResponseDto.create({ user, token });
  }

}
