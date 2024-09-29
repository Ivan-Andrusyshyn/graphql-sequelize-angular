import { DataTypes, Error } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { Users } from './user-sequelize';

export const Task = sequelize.define('tasks', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Task.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(Task, { foreignKey: 'userId' });

sequelize
  .sync()
  .then(() => {
    console.log('Users table created successfully!');
  })
  .catch((error: Error) => {
    console.error('Unable to create table : ', error);
  });
