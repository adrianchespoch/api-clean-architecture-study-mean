import { InjectionMode, asClass, createContainer } from 'awilix';

import { MongoUsersRepository } from '@/users/infrastructure/repositories';

import {
  AuthTokenGenerator,
  UserRegistrator,
} from '@/auth/application/use-cases';

import { AuthController } from '@/auth/infrastructure/rest/auth.controller';

import { AuthRoutes } from '@/auth/infrastructure/rest/auth.routes';
import { AppRouter } from '../server/router';

import { BcryptAdapter, JwtAdapter } from '@/auth/infrastructure/adapters';

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
    authTokenGenerator: asClass(AuthTokenGenerator),
  })
  .register({
    // // Controllers
    authController: asClass(AuthController),
  })
  .register({
    // // Routes
    authRoutes: asClass(AuthRoutes),
    AppRouter: asClass(AppRouter),
  })
  .register({
    // // UseCases - Adapters
    passwordProcessor: asClass(BcryptAdapter),
    authTokenHandler: asClass(JwtAdapter),
  });

export { container as diContainer };
