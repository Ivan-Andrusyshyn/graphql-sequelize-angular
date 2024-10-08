import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from '../../controllers/task';
import { login, registration, getAllUsers } from '../../controllers/auth';

export const usersResolvers = {
  getAllUsers,
  registration,
  login,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
