import { InjectionMode, asClass, createContainer } from 'awilix';

import { MongoUsersRepository } from '@/users/infrastructure/repositories';

import {
  AuthTokenGenerator,
  AuthTokenValidator,
  UserFinder,
  UserLogin,
  UserRegistrator,
} from '@/auth/application/use-cases';

import { AuthController } from '@/auth/infrastructure/rest/auth.controller';

import { AuthRoutes } from '@/auth/infrastructure/rest/auth.routes';
import { AppRouter } from '../server/router';

import { BcryptAdapter, JwtAdapter } from '@/auth/infrastructure/adapters';
import { UserCreator } from '@/users/application/use-cases';
import { AuthMiddleware } from '../server/middlewares';

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
    userCreator: asClass(UserCreator),
    userFinder: asClass(UserFinder),
    authTokenGenerator: asClass(AuthTokenGenerator),
    userRegistrator: asClass(UserRegistrator),
    userLogin: asClass(UserLogin),
    authTokenValidator: asClass(AuthTokenValidator),
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
  })
  .register({
    authMiddleware: asClass(AuthMiddleware),
  });

export { container as diContainer };
