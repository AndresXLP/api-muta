import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import DB from './Database/postgres';
import './Models/user';
import './Models/materials';
import './Models/collections';
import healthCheck from './Router/healthCheck.route';
import userRoute from './Router/user.route';
import materialRoute from './Router/materials.route';
import collectionRoute from './Router/collections.route';
import roadRoute from './Router/roads.route';
import notFound from './Router/_404.route';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status - :response-time ms'));

app.use('/api', healthCheck);
app.use('/api', userRoute);
app.use('/api', materialRoute);
app.use('/api', collectionRoute);
app.use('/api', roadRoute)

app.use(notFound);

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
