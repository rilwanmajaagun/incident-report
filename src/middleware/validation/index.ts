import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ApiError, Helper } from '@src/utils';

const { errorResponse } = Helper;
const validate = (schemas: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    await Promise.all(schemas.map((schema: any) => schema.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors: any[] = [];
    errors.array().map((err: any) => extractedErrors.push({ [err.param]: err.msg }));
    const error = new ApiError({
      status: 400,
      message: '" "',
      errors: extractedErrors,
    });
    return errorResponse(req, res, error);
  };
};

export default validate;
