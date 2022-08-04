import express from 'express';
import cron from 'node-cron';
import { sequelizeConnectionChecker } from '../database/mssqlConnection';
import { proceed } from '../services/emailNotifyHandler';

/**
|--------------------------------------------------
| Router.
|--------------------------------------------------
*/
import apiDocumentation from './swagger';
import userRoute from '../routes/user.route';

const serverBuilder = express();
serverBuilder.use(express.json());

console.info('========================= Starting Server =========================');

serverBuilder.use(sequelizeConnectionChecker);
serverBuilder.use('/api', apiDocumentation);
serverBuilder.use('/api/users', userRoute);

const port = process.env.PORT || 8080;
serverBuilder.listen(port);

console.info('========================= Server Running =========================');

cron.schedule('* * * * *', async() => {
  console.log('running a task every 9');
  await proceed();
});

export default serverBuilder;
