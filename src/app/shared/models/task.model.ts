export interface Task {
  id?: string;
  title: string;
  description: string;
  status: string;
  userId: string;
}

export interface TaskInput {
  title: string;
  status?: string;
  description: string;
  userId: string;
}
