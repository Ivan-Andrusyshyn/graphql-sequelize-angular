import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
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
import { TaskDetailsComponent } from '../../components/task-details/task-details.component';
import { catchError, finalize, of, take } from 'rxjs';

@Component({
  selector: 'app-tasks-profile',
  standalone: true,
  imports: [
    NgFor,
    OnScrollDirective,
    NgClass,
    TasksFormComponent,
    NgIf,
    AsyncPipe,
    TasksListComponent,
    TaskDetailsComponent,
  ],
  templateUrl: './tasks-profile.component.html',
  styleUrl: './tasks-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksProfileComponent implements OnInit {
  private lsService = inject(LocalStorageService);
  private tasksService = inject(TasksService);
  private fb = inject(FormBuilder);

  taskForm!: FormGroup;
  tasks: WritableSignal<Task[]> = signal<Task[]>([]);

  private currentTaskId: string = '';
  user = signal<User | null>(null);
  isOpenForm = signal<boolean>(false);
  isOpenDetails = signal<boolean>(false);
  isUpdate = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  currentTask = signal<Task | null>(null);

  constructor() {}

  ngOnInit(): void {
    this.isLoading.set(true);
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      status: ['OPEN', [Validators.required]],
    });
    const userData: User | null = this.lsService.getItem('user');
    if (userData) {
      this.user.set(userData);
    }
    this.tasksService
      .getAllTasks()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.isLoading.set(false)),
        take(1)
      )
      .subscribe((tasks) => {
        this.tasks.set(tasks);
      });
  }

  handleTask(): void {
    const user: User | null = this.lsService.getItem('user');

    if (!user) return;
    const newTask = { ...this.taskForm.value, userId: user.id };
    if (this.isUpdate()) {
      this.tasksService.updateTask(newTask).subscribe(() => {
        const tasksArray = this.tasks().slice() ?? [];
        newTask.id = this.currentTaskId;
        const index = tasksArray.findIndex(
          (item) => item.id === this.currentTaskId
        );
        tasksArray[index] = newTask;
        this.isOpenForm.set(true);
        this.tasks.set(tasksArray);
      });
    } else {
      this.tasksService.createTask(newTask).subscribe(() => {
        this.tasks.update((prev) => [...prev, newTask]);
      });
    }
  }

  closeDetails() {
    this.isOpenDetails.set(false);
  }

  openDetailsTasks(task: Task) {
    this.isOpenDetails.update((prev) => !prev);
    if (this.isOpenDetails()) {
      this.currentTask.set(task);
    }
  }

  updateTask(task: Task) {
    if (task.id && !this.isOpenDetails()) {
      this.taskForm.setValue({
        title: task.title,
        description: task.description,
        status: task.status,
      });
      this.currentTask.set(task);
      this.currentTaskId = task.id;
      this.isOpenForm.update((prev) => !prev);
      this.isUpdate.update((prev) => !prev);
    } else {
      console.log('Task id not exist');
    }
  }

  formToggleBtn() {
    this.isOpenForm.update((prev) => !prev);
    this.taskForm.reset();
    this.taskForm.patchValue({ status: 'OPEN' });
    this.isUpdate.set(false);
  }

  onDeleteTask(id: string | undefined) {
    const user: User | null = this.lsService.getItem('user');
    if (user && user.id && id) {
      this.tasksService.deleteTask(id, user.id);
      this.tasks.update((prev) => prev.filter((item) => item.id !== id));
    }
  }
}
