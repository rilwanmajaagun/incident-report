/* eslint-disable camelcase */
import { Request, Response, NextFunction } from 'express';
import AuthMiddleware from '@src/services/auth';
import { Helper, ErrorFactory, DBError, constants } from '@src/utils';

const { successResponse, moduleErrLogMessager } = Helper;
const { RESOURCE_CREATE_ERROR_STATUS, LOGIN_USER_SUCCESSFULLY } = constants;

class AuthController {
  private client_service = new AuthMiddleware();

  registerClient = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const { body, hash } = req;
      const [client] = await this.client_service.registerClient(body, hash);
      const token = Helper.generateToken(client, '24h');
      client.token = token;
      delete client.password;
      return successResponse(res, {
        code: 201,
        message: 'Client created successfully',
        data: client,
      });
    } catch (e) {
      const error = ErrorFactory.resolveError(e);
      const dbError = new DBError({ status: RESOURCE_CREATE_ERROR_STATUS('CLIENT'), message: e.message });
      moduleErrLogMessager(dbError);
      return next(error);
    }
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const { client } = req;
    const token = Helper.generateToken(client, '24h');
    client.token = token;
    delete client.password;
    return successResponse(res, {
      message: LOGIN_USER_SUCCESSFULLY,
      data: client,
    });
  };
}

export default new AuthController();
