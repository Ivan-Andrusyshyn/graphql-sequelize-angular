import { Component, Input, input, Output, signal } from '@angular/core';
import { OnScrollDirective } from '../../shared/directives/on-scroll.directive';
import { NgFor } from '@angular/common';
import { Task } from '../../shared/models/task.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [OnScrollDirective, NgFor],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  @Input() tasks: Task[] = [];
  @Output() onDeleteTask = new EventEmitter();
  @Output() onUpdateTask = new EventEmitter();

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

  updateTask(task: Task) {
    if (task) this.onUpdateTask.emit(task);
  }

  deleteTask(id: string | undefined) {
    this.onDeleteTask.emit(id);
  }
}
