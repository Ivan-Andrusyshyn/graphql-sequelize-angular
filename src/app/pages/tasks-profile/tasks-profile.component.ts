import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { LocalStorageService } from '../../shared/services/local-storage.service';
import { User } from '../../shared/models/user.model';
import { Task } from '../../shared/models/task.model';
import { TasksService } from '../../shared/services/tasks-service.service';
import { TasksFormComponent } from '../../components/tasks-form/tasks-form.component';
import { OnScrollDirective } from '../../shared/directives/on-scroll.directive';
import { TasksListComponent } from '../../components/tasks-list/tasks-list.component';

@Component({
  selector: 'app-tasks-profile',
  standalone: true,
  imports: [
    NgFor,
    OnScrollDirective,
    NgClass,
    TasksFormComponent,
    ReactiveFormsModule,
    NgIf,
    TasksListComponent,
  ],
  templateUrl: './tasks-profile.component.html',
  styleUrl: './tasks-profile.component.scss',
})
export class TasksProfileComponent implements OnInit {
  tasks: Task[] = [];
  taskForm!: FormGroup;
  isUpdate: boolean = false;
  currentTaskId: string = '';
  private fb = inject(FormBuilder);
  private lsService = inject(LocalStorageService);
  private tasksService = inject(TasksService);

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.tasksService.getAllTasks().subscribe(
      (response) => {
        console.log(response);
        this.tasks = [...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addTask(): void {
    const user: User | null = this.lsService.getItem('user');
    if (this.taskForm.valid && user) {
      const newTask = { ...this.taskForm.value, userId: user.id };
      if (this.isUpdate) {
        newTask.id = this.currentTaskId;
        this.tasksService.updateTask(newTask).subscribe({
          next: () => {
            const index = this.tasks.findIndex(
              (item) => item.id === this.currentTaskId
            );
            this.tasks[index] = newTask;
            this.taskForm.reset();
          },
          error: (err) => {
            console.error('Error creating task:', err);
          },
        });
      } else {
        this.tasksService.createTask(newTask).subscribe({
          next: (task) => {
            this.tasks.push(task);
            this.taskForm.reset();
          },
          error: (err) => {
            console.error('Error creating task:', err);
          },
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }
  updateTask(task: Task) {
    this.taskForm.setValue({
      title: task.title,
      description: task.description,
    });
    if (task.id) {
      this.currentTaskId = task.id;
      this.isUpdate = true;
    } else {
      console.log('Task id not exist');
    }
  }
  deleteTask(id: string | undefined) {
    const user: User | null = this.lsService.getItem('user');
    if (user && user.id && id) {
      this.tasksService.deleteTask(id, user.id).subscribe({
        next: () => {
          const index = this.tasks.findIndex((item) => item.id === id);
          this.tasks.splice(index, 1);
          this.taskForm.reset();
        },
        error: (err) => {
          console.error('Error creating task:', err);
        },
      });
    }
  }
}
