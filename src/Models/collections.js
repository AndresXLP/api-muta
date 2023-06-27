import { DataTypes } from 'sequelize';
import DB from '../Database/postgres';

const sequelize = DB.connection;

export const Collections = sequelize.define('collections', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amountCollected: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dateCollection: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default {
  Collections,
};
