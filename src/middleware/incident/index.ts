import { Request, Response, NextFunction } from 'express';
import { Helper, ApiError, constants } from '@src/utils';
import config from '@src/config/setup';

const { errorResponse, makeGetRequest } = Helper;
const { RESOURCE_NOT_FOUND } = constants;

class IncidentMiddleware {
  getWeatherReport = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const {
        body: { city },
      } = req;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config?.WEATHER_API_KEY}`;
      const { data } = await makeGetRequest(url);
      req.weatherReport = data;
      return next();
    } catch (error) {
      if (error.status === 404) {
        const apiError = new ApiError({
          status: 404,
          message: RESOURCE_NOT_FOUND('City'),
        });
        return errorResponse(req, res, apiError);
      }
      return next(error);
    }
  };
}

export default new IncidentMiddleware();
