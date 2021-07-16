/* eslint-disable camelcase */
import ClientService from '@src/services/auth';
import { Request, Response, NextFunction } from 'express';
import { Helper, genericErrors, ErrorFactory, DBError } from '@src/utils';

const { errorResponse, moduleErrLogMessager } = Helper;

class AuthMiddleware {
  private client_service = new ClientService();

  validateClient =
    (type = '') =>
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      try {
        const { body } = req;
        const [client] = await this.client_service.getClient(body);
        if (type === 'check' && client) {
          return errorResponse(req, res, genericErrors.conflictSignupError);
        }
        if (type === 'validate' && !client) {
          return errorResponse(req, res, genericErrors.inValidLogin);
        }
        req.client = client;
        return next();
      } catch (e) {
        const error = ErrorFactory.resolveError(e);
        const dbError = new DBError({ status: 'VALIDATE CLIENT', message: e.message });
        moduleErrLogMessager(dbError);
        return next(error);
      }
    };

  hashPassword = (req: Request, res: Response, next: NextFunction): void => {
    const data = req.body.password || req.body.new_password;
    const hash = Helper.hashPassword(data);
    req.hash = hash;
    next();
  };

  comparePassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const {
      body: { password },
      client,
    } = req;
    const isValidPassword = Helper.comparePassword(client.password, password);
    return isValidPassword ? next() : errorResponse(req, res, genericErrors.inValidLogin);
  };

  decodeToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      let token = req.headers['x-access-token'] || req.headers.authorization || req.query.token;
      if (!token) {
        return errorResponse(req, res, genericErrors.authRequired);
      }
      if (typeof token === 'string') {
        if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }
        const decodedToken = <any>Helper.decodeToken(token);

        req.decodedToken = decodedToken;
        return decodedToken.message ? errorResponse(req, res, genericErrors.authRequired) : next();
      }
      return errorResponse(req, res, genericErrors.authRequired);
    } catch (error) {
      return errorResponse(req, res, genericErrors.authRequired);
    }
  };

  verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { decodedToken } = req;
      const [client] = await this.client_service.getClient(decodedToken);
      if (client) {
        req.client = client;
        delete client.password;
        return next();
      }
      return errorResponse(req, res, genericErrors.authRequired);
    } catch (error) {
      return errorResponse(req, res, genericErrors.authRequired);
    }
  };
}

export default new AuthMiddleware();
