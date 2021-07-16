/* eslint-disable camelcase */
import { Application } from 'express';
import CommonRoutesConfig from '../common/common.routes.config';
import AuthController from '@src/controller/auth';
import AuthMiddleware from '@src/middleware/auth';
import validation from '@src/middleware/validation';
import { authSchema } from '@src/utils/validationSchema';

export default class ClientRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'IncidentRoutes');
  }

  configureRoutes(): Application {
    this.app
      .route('/api/v1/auth/register')
      .post(
        validation(authSchema.registerSchema),
        AuthMiddleware.validateClient('check'),
        AuthMiddleware.hashPassword,
        AuthController.registerClient
      );
    this.app
      .route('/api/v1/auth/login')
      .post(
        validation(authSchema.loginSchema),
        AuthMiddleware.validateClient('validate'),
        AuthMiddleware.comparePassword,
        AuthController.login
      );
    return this.app;
  }
}
