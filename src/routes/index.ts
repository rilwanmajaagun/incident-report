import { Application } from 'express';
import CommonRoutesConfig from './common/common.routes.config';
import IncidentRoutes from './incidents/incident.routes.config';
import ClientRoutes from './auth/auth.routes.config';

const routes: Array<CommonRoutesConfig> = [];

const route = (app: Application): void => {
  routes.push(new IncidentRoutes(app));
  routes.push(new ClientRoutes(app));
};

export { routes, route };
