import { Request, Response } from 'express';

import { UnauthorizedError } from '@/auth/domain/errors';
import { DomainError, ResourceNotFoundError } from '@/shared/domain';
import { CreateUser } from '@/users/domain/use-cases';
import { UserMapper } from '../mappers';

export class UsersController {
  ///* DI
  constructor(private readonly userCreator: CreateUser) {}

  create = async (req: Request, res: Response) => {
    try {
      const user = this.userCreator.run(req.body);

      const userMapped = UserMapper.domainModelToResponseDto(user);
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
