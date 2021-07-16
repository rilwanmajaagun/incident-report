/* eslint-disable no-unused-vars */
import cors from 'cors';
import morgan from 'morgan';
import { Application, json, urlencoded, Request, Response, NextFunction } from 'express';
import { Helper, genericErrors, constants } from '@src/utils';
import { route } from '@src/routes';

const { successResponse, errorResponse } = Helper;
const { notFoundApi } = genericErrors;

const { WELCOME } = constants;

const expressConfig = (app: Application): void => {
  app.use(cors());
  app.use(
    urlencoded({
      extended: true,
    })
  );
  app.use(json());
  app.use(morgan('dev'));
  route(app);

  app.get('/', (req: Request, res: Response) => successResponse(res, { message: WELCOME }));

  app.use((req, res, next) => next(notFoundApi));

  app.use((err: any, req: Request, res: Response, next: NextFunction) => errorResponse(req, res, err));
};

export default expressConfig;
