import { InvalidArgumentError } from '@/shared/domain';

export type UserProps = {
  id?: string;
  rol: UserRole;
  name: string;
  surname: string;
  email: string;
  password: string;
  state: boolean;
  avatar?: string;
  phone?: string;
  birthday?: string;
  profession?: string;
  description?: string;
};
export enum UserRole {
  client = 'client',
  admin = 'admin',
  instructor = 'instructor',
}

export class User {
  constructor(
    public readonly id: string | null | undefined,
    public readonly rol: UserRole,
    public readonly name: string,
    public readonly surname: string,
    public readonly email: string,
    public password: string,
    public readonly state: boolean,
    public readonly avatar?: string,
    public readonly phone?: string,
    public readonly birthday?: string,
    public readonly profession?: string,
    public readonly description?: string
  ) {}

  static create(props: UserProps) {
    this.validate(props);

    const user = new User(
      props.id,
      props.rol,
      props.name,
      props.surname,
      props.email,
      props.password,
      props.state,
      props.avatar,
      props.phone,
      props.birthday,
      props.profession,
      props.description
    );

    ///* Domain Event

    return user;
  }

  private static validate({
    id,
    rol,
    name,
    surname,
    email,
    password,
    state,
    avatar,
    phone,
    birthday,
    profession,
    description,
  }: UserProps): void {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (id && typeof id !== 'number')
      throw new InvalidArgumentError('Invalid ID');

    if (!rol || rol.length > 30)
      throw new InvalidArgumentError(
        'Role length should be less than or equal to 30 characters.'
      );

    if (
      rol !== UserRole.client &&
      rol !== UserRole.admin &&
      rol !== UserRole.instructor
    )
      throw new InvalidArgumentError(`'${rol}' is an invalid role`);

    if (name.length < 3 || name.length > 250)
      throw new InvalidArgumentError(
        'Name should be between 3 and 250 characters.'
      );

    if (surname.length < 3 || surname.length > 250)
      throw new InvalidArgumentError(
        'Surname should be between 3 and 250 characters.'
      );

    if (!emailPattern.test(email))
      throw new InvalidArgumentError('Invalid email format.');

    if (password.length < 3 || password.length > 250)
      throw new InvalidArgumentError(
        'Password should be at least 6 characters.'
      );

    if (typeof state !== 'boolean')
      throw new InvalidArgumentError(
        'State should be true (active) or false (inactive).'
      );

    if (avatar && avatar.length > 250)
      throw new InvalidArgumentError(
        'Avatar length should be less than or equal to 250 characters.'
      );

    if (phone && phone.length > 30)
      throw new InvalidArgumentError(
        'Phone length should be less than or equal to 30 characters.'
      );

    if (birthday && birthday.length > 30)
      throw new InvalidArgumentError(
        'Birthday length should be less than or equal to 30 characters.'
      );

    if (profession && profession.length > 250)
      throw new InvalidArgumentError(
        'Profession length should be less than or equal to 250 characters.'
      );

    if (description && description.length > 250)
      throw new InvalidArgumentError(
        'Description length should be less than or equal to 250 characters.'
      );
  }
}
