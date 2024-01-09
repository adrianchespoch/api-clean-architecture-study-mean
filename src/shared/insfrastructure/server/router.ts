import { Router } from 'express';

import { AuthRoutes } from '@/auth/infrastructure/rest/auth.routes';
import { UsersRoutes } from '@/users/infrastructure/rest/users.routes';

export class AppRouter {
  ///* DI
  constructor(
    private readonly authRoutes: AuthRoutes,
    private readonly usersRoutes: UsersRoutes
  ) {}

  get routes(): Router {
    const router = Router();

    router.use('/api/auth', this.authRoutes.routes);
    router.use('/api/users', this.usersRoutes.routes);

    return router;
  }
}
