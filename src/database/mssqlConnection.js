import 'dotenv/config';
import Sequelize from 'sequelize';
import { defaultToIfEmpty } from '../helper/utils';

const DB_CONNECTION = defaultToIfEmpty(process.env.DB_CONNECTION, 'mssql');
const DB_HOST = defaultToIfEmpty(process.env.DB_HOST, 'localhost');
const DB_PORT = defaultToIfEmpty(process.env.DB_PORT, 1433);
const DB_NAME = defaultToIfEmpty(process.env.DB_NAME, 'example-service');
const DB_USERNAME = defaultToIfEmpty(process.env.DB_USERNAME, 'sa');
const DB_PASSWORD = defaultToIfEmpty(process.env.DB_PASSWORD, 'example-service');

const sequelizeConnection = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_CONNECTION,
  dialectOptions: {
    options: {
      encrypt: true,
      // useUTC: true
    }
  },
  logging: false, // console.log,
  // timezone: '+08:00',
  pool: {
    max: 1,
    min: 0,
    idle: 10000
  }
});

/**
 * Check connection to DB
 */
export const sequelizeConnectionChecker = async(_, res, next) => {
  try {
    await sequelizeConnection.authenticate();
    return next();
  } catch (e) {
    e.message = `Unable to connect to the db: ${e.message}`;
    console.error(e.message);
    return res
      .status(500)
      .json({
        success: {
          status: false,
          message: 'Oops! Something went wrong, please try again or contact the support desk'
        }
      });
  }
};

export default sequelizeConnection;
