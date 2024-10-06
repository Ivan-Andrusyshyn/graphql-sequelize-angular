import { TaskStatus } from '../../task-sequelize';

export interface TaskTypes {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId?: string;
}
