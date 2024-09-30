import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Task } from '../../shared/models/task.model';
import { opacityAnimation } from './animations';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
  animations: [opacityAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsComponent {
  @Input() currentTask: Task | null = null;
  @Input() isOpen: boolean = false;

  @Output() closeDetails = new EventEmitter<void>();
  onClose() {
    this.closeDetails.emit();
  }
}
