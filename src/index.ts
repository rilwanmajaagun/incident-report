import dotenv from 'dotenv-safe';
import express from 'express';
import expressConfig from '@src/config/express';
import db from '@src/config/db';
import logger from './config/logger';

dotenv.config();

const port = process.env.PORT || 5000;
const app: express.Application = express();

expressConfig(app);

db.connect()
  .then(() => {
    app.listen(port, () => {
      logger.info(`application listening on ${port}`);
    });
  })
  .catch(error => {
    logger.info(error);
  });

export default app;
