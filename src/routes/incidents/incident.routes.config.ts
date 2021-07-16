import { Application } from 'express';
import CommonRoutesConfig from '../common/common.routes.config';
import IncidentsController from '@src/controller/incidents';
import IncidentsMiddleware from '@src/middleware/incident';
import validation from '@src/middleware/validation';
import AuthMiddleware from '@src/middleware/auth';
import { incidentSchema } from '@src/utils/validationSchema';

export default class IncidentRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'IncidentRoutes');
  }

  configureRoutes(): Application {
    this.app
      .route('/api/v1/incident')
      .post(
        AuthMiddleware.decodeToken,
        AuthMiddleware.verifyToken,
        validation(incidentSchema),
        IncidentsMiddleware.getWeatherReport,
        IncidentsController.createIncident
      )
      .get(AuthMiddleware.decodeToken, AuthMiddleware.verifyToken, IncidentsController.getAllIncidents);
    return this.app;
  }
}
