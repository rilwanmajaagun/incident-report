/* eslint-disable camelcase */
import axios from 'axios';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ClientDto } from '@src/dto/auth.dto';
import config from '@src/config/setup';
import constants from '../constants';
import genericError from '../error/generic';
import ModuleError from '../error/module.error';
import logger from 'src/config/logger';

interface ErrorDto {
  status: number;
  message: string;
  errors: Array<any[]>;
}
interface responseDto {
  data?: any;
  message: string;
  code?: number;
}

const { serverError } = genericError;
const { FAIL, SUCCESS, SUCCESS_RESPONSE } = constants;

const secret = <string>config?.INCIDENT_REPORT_SECRET;

class Helper {
  static hashPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  static generateToken = (data: ClientDto, expiresIn: string): string => {
    const { id, email, first_name, last_name } = data;
    return jwt.sign(
      {
        id,
        email,
        last_name,
        first_name,
      },
      secret,
      { expiresIn }
    );
  };

  static comparePassword = (hashedPassword: string, password: string): boolean =>
    bcrypt.compareSync(password, hashedPassword);

  static decodeToken = (token: string): void =>
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return err;
      }
      return decoded;
    });

  static successResponse(res: Response, { data, message = SUCCESS_RESPONSE, code = 200 }: responseDto): Response<any> {
    return res.status(code).json({
      status: SUCCESS,
      message,
      data,
    });
  }

  static errorResponse(req: Request, res: Response, error: ErrorDto): Response {
    const aggregateError = { ...serverError, ...error };
    Helper.apiErrLogMessager(aggregateError, req);
    return res.status(aggregateError.status).json({
      status: FAIL,
      message: aggregateError.message,
      errors: aggregateError.errors,
    });
  }

  static moduleErrLogMessager(error: any): any {
    return logger.info(`${error.status} - ${error.name} - ${error.message}`);
  }

  static apiErrLogMessager(error: any, req: Request): void {
    logger.info(`${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  }

  static async makeGetRequest(url: string, options: any = {}): Promise<any | Error> {
    try {
      const { status, data } = await axios({ url, method: 'GET', ...options });
      return { status, data };
    } catch (e) {
      const status = e.response ? e.response.status : 500;
      const moduleError = new ModuleError({ message: e.message, status });
      Helper.moduleErrLogMessager(moduleError);
      throw moduleError;
    }
  }
}

export default Helper;
