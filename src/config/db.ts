import dotenv from 'dotenv-safe';
import pgp from 'pg-promise';
import promise from 'bluebird';
import config from './setup';

dotenv.config();

const dataBaseUrl = config?.DATABASE_URL || '';
const pg = pgp({ promiseLib: promise, noWarnings: true });
const db = pg(dataBaseUrl);

export default db;
