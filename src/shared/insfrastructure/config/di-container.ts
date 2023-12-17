import { InjectionMode, asClass, createContainer } from 'awilix';

import { MongoUsersRepository } from '@/users/infrastructure/repositories';

import { AuthRoutes } from '@/auth/infrastructure/rest/auth.routes';

import { AuthController } from '@/auth/infrastructure/rest/auth.controller';

import { UserRegistrator } from '@/auth/application/use-cases';
import { AppRouter } from '../server/router';

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container
  .register({
    // // Repositories
    userRepository: asClass(MongoUsersRepository),
  })
  .register({
    // // UseCases
    userRegistrator: asClass(UserRegistrator),
  })
  .register({
    // // Controllers
    authController: asClass(AuthController),
  })
  .register({
    // // Routes
    authRoutes: asClass(AuthRoutes),
    AppRouter: asClass(AppRouter),
  });

export { container as diContainer };
