import devEnv from './env/devEnv';
import testEnv from './env/testEnv';

const { NODE_ENV } = process.env;

export default {
  test: testEnv,
  development: devEnv,
}[NODE_ENV || 'development'];
