import { DataTypes, Error } from 'sequelize';
import { sequelize } from '../config/sequelize';

export const Users = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
});
sequelize
  .sync()
  .then(() => {
    console.log('Users table created successfully!');
  })
  .catch((error: Error) => {
    console.error('Unable to create table : ', error);
  });
