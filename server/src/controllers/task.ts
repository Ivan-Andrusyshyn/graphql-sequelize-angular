import { TaskTypes } from '../models/graphql/types/task.interface';
import { Task } from '../models/task-sequelize';

export const getAllTasks = async (
  parent: any,
  args: { isAuth: boolean; userId: string },
  context: any
): Promise<TaskTypes[]> => {
  try {
    const tasks = await Task.findAll({
      where: { userId: args.userId },
      attributes: ['id', 'title', 'description'],
    });

    return tasks.map((task: TaskTypes) => ({
      id: task.id,
      title: task.title,
      description: task.description,
    }));
  } catch (error: any) {
    console.error('Error fetching tasks:', error.message || error);
    throw new Error('Could not fetch tasks. Please try again later.');
  }
};

export const createTask = async ({
  input,
}: {
  input: TaskTypes;
}): Promise<TaskTypes> => {
  const { title, description, userId } = input;

  try {
    const existingTask = await Task.findOne({
      where: { title, userId },
    });

    if (existingTask) {
      throw new Error('Task with this title already exists for this user.');
    }

    const createdTask = await Task.create({ title, description, userId });

    return {
      id: createdTask.id,
      title: createdTask.title,
      description: createdTask.description,
    };
  } catch (error: any) {
    console.error('Error creating task:', error.message || error);
    throw new Error('Could not create task. Please try again later.');
  }
};

export const updateTask = async ({
  input,
}: {
  input: TaskTypes;
}): Promise<TaskTypes> => {
  const { id, title, description, userId } = input;

  try {
    const existingTask = await Task.findOne({
      where: { id, userId },
    });

    if (!existingTask) {
      throw new Error(
        'Task not found or you do not have permission to update this task.'
      );
    }

    await existingTask.update({
      title,
      description,
    });

    console.log(`Task updated by user ${userId}:`, existingTask);

    return {
      id: existingTask.id,
      title: existingTask.title,
      description: existingTask.description,
    };
  } catch (error: any) {
    console.error('Error updating task:', error.message || error);
    throw new Error('Could not update task. Please try again later.');
  }
};
export const deleteTask = async ({
  input,
}: {
  input: TaskTypes;
}): Promise<string> => {
  const { id, userId } = input;
  try {
    const existingTask = await Task.findOne({
      where: { id, userId },
    });

    if (!existingTask) {
      throw new Error(
        'Task not found or you do not have permission to delete this task.'
      );
    }
    await existingTask.destroy();
    const tasks = await Task.findAll({
      where: { userId },
      attributes: ['id', 'title', 'description'],
    });
    return tasks.map((task: TaskTypes) => ({
      id: task.id,
      title: task.title,
      description: task.description,
    }));
  } catch (error: any) {
    console.error('Error deleting task:', error.message || error);
    throw new Error('Could not delete task. Please try again later.');
  }
};
