import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { openCloseAnimation } from './animations';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Component({
  selector: 'app-tasks-form',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [openCloseAnimation],
})
export class TasksFormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() isOpen: boolean = false;
  @Output() submitForm = new EventEmitter();

  statusOptions = Object.values(TaskStatus);

  ngOnInit(): void {}

  addTask() {
    this.submitForm.emit();
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
  get title() {
    return this.formGroup.get('title');
  }

  get status() {
    return this.formGroup.get('status');
  }
  get description() {
    return this.formGroup.get('description');
  }
}
