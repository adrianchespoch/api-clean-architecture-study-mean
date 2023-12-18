import { Router } from 'express';
import { AuthController } from './auth.controller';

export class AuthRoutes {
  ///* DI
  constructor(private readonly authController: AuthController) {}

  get routes(): Router {
    const router = Router();

    router.post('/register', this.authController.register);
    router.post('/login', this.authController.login);
    
    router.post('/register-admin', this.authController.registerAdmin);

    return router;
  }
}
