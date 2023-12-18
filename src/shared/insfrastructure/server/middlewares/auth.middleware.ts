import { RequestHandler } from 'express';

import { ValidateAuthToken } from '@/auth/domain/use-cases';
import { DomainError } from '@/shared/domain';



export class AuthMiddleware {

  constructor(private readonly authTokenValidator: ValidateAuthToken) {}


  validateJWT: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.authTokenValidator.run(
        req.header('Authorization') ?? ''
      );

      // isActive - soft delete?
      req.body.authUser = user;

      next();
    } catch (error: unknown) {
      if (error instanceof DomainError)
        return res.status(401).json({ error: 'Invalid token' });

      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

}
