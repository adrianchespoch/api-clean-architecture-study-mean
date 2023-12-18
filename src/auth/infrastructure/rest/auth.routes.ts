import { Router } from 'express';

import { AuthMiddleware } from '@/shared/insfrastructure/server/middlewares';
import { AuthController } from './auth.controller';

export class AuthRoutes {
  ///* DI
  constructor(
    private readonly authController: AuthController,
    private readonly authMiddleware: AuthMiddleware
  ) {}

  get routes(): Router {
    const router = Router();

    router.post('/register', this.authController.register);
    router.post('/login', this.authController.login);
    router.get(
      '/renew-token',
      [this.authMiddleware.validateJWT],
      this.authController.renewJwt
    );

    // TODO: create admin when app started up & secure this endpoint with AdminPrivilegies
    router.post('/register-admin', this.authController.registerAdmin);

    return router;
  }
}
