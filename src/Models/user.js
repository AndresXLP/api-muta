import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import DB from '../Database/postgres';

const sequelize = DB.connection;

export const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.beforeCreate(async (user) => {
  const thisUser = user;
  const salt = await bcrypt.genSalt(10);
  thisUser.password = await bcrypt.hash(user.password, salt);
});

export default {
  User,
};
