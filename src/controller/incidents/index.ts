/* eslint-disable camelcase */
import { Request, Response, NextFunction } from 'express';
import IncidentService from '@src/services/incident';
import { Helper, constants, ErrorFactory, DBError } from '@src/utils';

const { successResponse, moduleErrLogMessager } = Helper;
const { RESOURCE_FETCH_SUCCESS, RESOURCE_CREATE_SUCCESS, RESOURCE_CREATE_ERROR_STATUS, RESOURCE_FETCH_ERROR_STATUS } =
  constants;

class IncidentController {
  private incident_service = new IncidentService();

  createIncident = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const {
        body,
        weatherReport,
        client: { id },
      } = req;
      body.client_id = id;
      body.weatherReport = weatherReport;
      const incident = await this.incident_service.createIncident(body);
      return successResponse(res, {
        code: 201,
        message: RESOURCE_CREATE_SUCCESS('Incident Reports'),
        data: incident,
      });
    } catch (e) {
      const error = ErrorFactory.resolveError(e);
      const dbError = new DBError({ status: RESOURCE_CREATE_ERROR_STATUS('INCIDENT'), message: e.message });
      moduleErrLogMessager(dbError);
      return next(error);
    }
  };

  getAllIncidents = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const data = await this.incident_service.getAllIncidents();
      return successResponse(res, {
        message: RESOURCE_FETCH_SUCCESS('Incident Reports'),
        data,
      });
    } catch (e) {
      const error = ErrorFactory.resolveError(e);
      const dbError = new DBError({ status: RESOURCE_FETCH_ERROR_STATUS('INCIDENT'), message: e.message });
      moduleErrLogMessager(dbError);
      return next(error);
    }
  };
}

export default new IncidentController();
