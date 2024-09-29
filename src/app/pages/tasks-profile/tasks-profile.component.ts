import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, take } from 'rxjs';

import { LocalStorageService } from '../../shared/services/local-storage.service';
import { User } from '../../shared/models/user.model';
import { Task } from '../../shared/models/task.model';
import { TasksService } from '../../shared/services/tasks-service.service';
import { TasksFormComponent } from '../../components/tasks-form/tasks-form.component';
import { OnScrollDirective } from '../../shared/directives/on-scroll.directive';
import { TasksListComponent } from '../../components/tasks-list/tasks-list.component';
import { Observable } from '@apollo/client';

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
    AsyncPipe,
    TasksListComponent,
  ],
  templateUrl: './tasks-profile.component.html',
  styleUrl: './tasks-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksProfileComponent {
  tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  taskForm!: FormGroup;
  isUpdate: boolean = false;
  currentTaskId: string = '';

  private cd = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private lsService = inject(LocalStorageService);
  private tasksService = inject(TasksService);

  constructor() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.tasksService
      .getAllTasks()
      .pipe(takeUntilDestroyed())
      .subscribe(
        (response) => {
          this.tasks.next(response);
          this.cd.markForCheck();
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
      const tasksArray = this.tasks.value.slice();

      if (this.isUpdate) {
        newTask.id = this.currentTaskId;
        this.tasksService
          .updateTask(newTask)
          .pipe(take(1))
          .subscribe({
            next: () => {
              const index = tasksArray.findIndex(
                (item) => item.id === this.currentTaskId
              );
              tasksArray[index] = newTask;

              this.tasks.next(tasksArray);

              this.taskForm.reset();
              this.cd.markForCheck();
            },
            error: (err) => {
              console.error('Error creating task:', err);
            },
          });
      } else {
        this.tasksService
          .createTask(newTask)
          .pipe(take(1))
          .subscribe({
            next: (task) => {
              tasksArray.push(task);
              this.tasks.next(tasksArray);

              this.taskForm.reset();
              this.cd.markForCheck();
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

  onDeleteTask(id: string | undefined) {
    const user: User | null = this.lsService.getItem('user');
    if (user && user.id && id) {
      this.tasksService
        .deleteTask(id, user.id)
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            this.tasks.next(response);
            this.taskForm.reset();
          },
          error: (err) => {
            console.error('Error creating task:', err);
          },
        });
    }
  }
}
