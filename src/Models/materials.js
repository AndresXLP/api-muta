import { DataTypes } from 'sequelize';
import { Collections } from './collections';
import DB from '../Database/postgres';

const sequelize = DB.connection;

export const Materials = sequelize.define('materials', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Materials.hasMany(Collections, {
  foreignKey: 'materialId',
  sourceKey: 'id',
});

Collections.belongsTo(Materials, {
  foreignKey: 'materialId',
  targetKey: 'id',
});

export default {
  Materials,
};
