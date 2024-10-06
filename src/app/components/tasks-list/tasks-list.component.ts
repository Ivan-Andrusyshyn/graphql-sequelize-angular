import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  signal,
} from '@angular/core';
import { OnScrollDirective } from '../../shared/directives/on-scroll.directive';
import { NgFor } from '@angular/common';
import { Task } from '../../shared/models/task.model';
import { EventEmitter } from '@angular/core';
import { translateAnimation } from './animations';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [OnScrollDirective, NgFor],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
  animations: [translateAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent {
  @Input() tasks: Task[] = [];
  @Input() isOpenForm: boolean = false;
  @Input() isOpenDetails: boolean = false;
  @Input() isUpdate: boolean = false;

  @Output() onDeleteTask = new EventEmitter();
  @Output() onUpdateTask = new EventEmitter();
  @Output() openDetailsTasks = new EventEmitter();

  expandedTaskId = signal<string | null>(null);
  showOptions = signal<boolean>(false);

  isCurrentTaskExpended(taskId: string | undefined) {
    return taskId
      ? this.expandedTaskId() === taskId && this.showOptions()
      : false;
  }

  showMoreDetails(task: Task) {
    if (task.id) {
      if (this.expandedTaskId() === task.id) {
        this.showOptions.set(false);
        this.expandedTaskId.set(null);
      } else {
        this.showOptions.set(true);
        this.expandedTaskId.set(task.id);
      }
    }
  }

  onDetailsTask(task: Task) {
    this.openDetailsTasks.emit(task);
  }

  updateTask(task: Task) {
    if (task) this.onUpdateTask.emit(task);
  }

  handleColorByStatus(status: string): string {
    const statusColors: { [key: string]: string } = {
      OPEN: '#FF6B6B',
      IN_PROGRESS: '#FFD93D',
      DONE: '#4CAF50',
    };

    return statusColors[status] || 'gray';
  }

  deleteTask(id: string | undefined) {
    this.onDeleteTask.emit(id);
  }
}
