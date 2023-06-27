import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import DB from './database/postgres';
import './models/user';
import './models/materials';
import healthCheck from './router/healthCheck.route';
import userRoute from './router/user.route';
import materialRoute from './router/materials.route';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status - :response-time ms'));

app.use('/api', healthCheck);
app.use('/api', userRoute);
app.use('/api', materialRoute);
(async () => {
  try {
    const database = await DB.connection;
    await database.authenticate();
    console.log('Postgres Database Connection Successfully');
    await database.sync();
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  } catch (e) {
    console.log(e);
    process.exit(0);
  }
})();
