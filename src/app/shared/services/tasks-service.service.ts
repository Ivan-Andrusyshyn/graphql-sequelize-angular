import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CREATE_TASK,
  DELETE_TASK,
  GET_ALL_TASKS,
  UPDATE_TASK,
} from '../apollo/task';
import { Task, TaskInput } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private apollo: Apollo) {}

  getAllTasks() {
    return this.apollo
      .watchQuery<{ getAllTasks: Task[] }>({
        query: GET_ALL_TASKS,
      })
      .valueChanges.pipe(map((result) => result.data!.getAllTasks));
  }

  createTask(input: TaskInput): Observable<Task> {
    return this.apollo
      .mutate<{ createTask: Task }>({
        mutation: CREATE_TASK,
        variables: {
          input,
        },
      })
      .pipe(map((result) => result.data!.createTask));
  }

  updateTask(input: TaskInput): Observable<Task> {
    return this.apollo
      .mutate<{ updateTask: Task }>({
        mutation: UPDATE_TASK,
        variables: {
          input,
        },
      })
      .pipe(map((result) => result.data!.updateTask));
  }

  deleteTask(id: string, userId: string): Observable<Task[]> {
    return this.apollo
      .mutate<{ deleteTask: Task[] }>({
        mutation: DELETE_TASK,
        variables: {
          input: {
            id,
            userId,
          },
        },
      })
      .pipe(map((result) => result.data!.deleteTask));
  }
}
