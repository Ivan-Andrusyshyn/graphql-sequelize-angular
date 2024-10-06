import { DataTypes, Error } from 'sequelize';
import { sequelize } from '../config/sequelize';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
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
  role: {
    type: DataTypes.ENUM(UserRole.ADMIN, UserRole.USER),
    allowNull: false,
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
