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
import { of } from 'rxjs';

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
export class TasksFormComponent {
  @Input() isOpenForm: boolean = false;
  @Input() formGroup!: FormGroup;
  @Output() submitForm = new EventEmitter();
  @Output() formToggleBtn = new EventEmitter();

  statusOptions = Object.values(TaskStatus);

  addTask() {
    if (this.formGroup.valid) {
      this.submitForm.emit();
    } else {
      throw 'Form is invalid!';
    }
  }
  toggle() {
    this.formToggleBtn.emit();
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
