import { Request, Response } from 'express';

import { LoginDto } from '@/auth/domain/dtos';
import { UnauthorizedError } from '@/auth/domain/errors';
import {
  GenerateAuthToken,
  LoginUser,
  RegisterUser,
} from '@/auth/domain/use-cases';
import { JwtConstants } from '@/shared/application/constants';
import { DomainError, ResourceNotFoundError } from '@/shared/domain';
import { UserRole } from '@/users/domain/entities';
import { UserMapper } from '@/users/infrastructure/mappers';

export class AuthController {
  ///* DI
  constructor(
    private readonly userRegistrator: RegisterUser,
    private readonly userLogin: LoginUser,
    private readonly authTokenGenerator: GenerateAuthToken
  ) {}

  register = async (req: Request, res: Response) => {
    try {
      const userToken = await this.userRegistrator.run({
        ...req.body,
        rol: UserRole.client,
      });

      const userMapped = UserMapper.domainModelToResponseDto(userToken);
      return res.status(201).json(userMapped);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const loginDto = LoginDto.create(req.body);

      const userToken = await this.userLogin.run(loginDto);

      const userMapped = UserMapper.domainModelToResponseDto(userToken);
      return res.status(201).json(userMapped);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  registerAdmin = async (req: Request, res: Response) => {
    try {
      const userToken = await this.userRegistrator.run({
        ...req.body,
        rol: UserRole.admin,
      });

      const userMapped = UserMapper.domainModelToResponseDto(userToken);
      return res.status(201).json(userMapped);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  renewJwt = async (req: Request, res: Response) => {
    try {
      const { authUser } = req.body;
      if (!authUser) throw new UnauthorizedError('Invalid token');

      ///* generate JWT
      const token = await this.authTokenGenerator.run(
        { id: authUser.id },
        JwtConstants.duration
      );

      const userMapped = UserMapper.domainModelToResponseDto({
        user: authUser,
        token,
      });
      return res.status(201).json(userMapped);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof UnauthorizedError)
      return res.status(401).json({ error: error.message });
    if (error instanceof ResourceNotFoundError)
      return res.status(404).json({ error: error.message });

    if (error instanceof DomainError)
      return res.status(400).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };
}
