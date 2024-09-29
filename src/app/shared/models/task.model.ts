export interface Task {
  id?: string;
  title: string;
  description: string;
  userId: string;
}

export interface TaskInput {
  title: string;
  description: string;
  userId: string;
}
