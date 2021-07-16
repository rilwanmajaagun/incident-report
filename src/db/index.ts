import incidentQuery from './queries/incident';
import clientQuery from './queries/client';
import db from 'src/config/db';
import { IObjectKeys } from '@src/dto/common.dto';

const queries: IObjectKeys = {
  incidentQuery,
  clientQuery,
};

export default {
  transact: (query: string, data: Array<any>, type: string): Promise<any[]> => db.any(queries[type][query], data),
};
