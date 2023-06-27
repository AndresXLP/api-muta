import { Sequelize } from 'sequelize';

class Postgres {
  constructor() {
    const dbHost = process.env.DDB_HOST || '';
    const dbPort = process.env.DDB_PORTPORT || '';
    const dbName = process.env.DDB_NAME || '';
    const dbUser = process.env.DDB_USER || '';
    const dbPwd = process.env.DDB_PASSWORD || '';

    this.connection = new Sequelize(`postgres://${dbUser}:${dbPwd}@${dbHost}:${dbPort}/${dbName}`);
  }
}
const DB = new Postgres();

module.exports = DB;
