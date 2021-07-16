import dotenv from 'dotenv-safe';

dotenv.config();

const { INCIDENT_REPORT_DEV_DATABASE_URL, WEATHER_API_DEV_KEY, INCIDENT_REPORT_SECRET } = process.env;
export default {
  DATABASE_URL: INCIDENT_REPORT_DEV_DATABASE_URL,
  WEATHER_API_KEY: WEATHER_API_DEV_KEY,
  INCIDENT_REPORT_SECRET,
};