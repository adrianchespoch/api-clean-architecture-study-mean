import { Router } from 'express';

import { AuthMiddleware } from '@/shared/insfrastructure/server/middlewares';
import { UsersController } from './users.controller';

export class UsersRoutes {
  ///* DI
  constructor(
    private readonly usersController: UsersController,
    private readonly authMiddleware: AuthMiddleware
  ) {}

  get routes(): Router {
    const router = Router();

    router.post(
      '/',
      [this.authMiddleware.validateJWT],
      this.usersController.create
    );

    return router;
  }
}
