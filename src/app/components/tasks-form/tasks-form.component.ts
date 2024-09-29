import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tasks-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksFormComponent {
  @Input() formGroup!: FormGroup;
  @Output() submitForm = new EventEmitter();

  addTask() {
    this.submitForm.emit();
  }

  get title() {
    return this.formGroup.get('title');
  }

  get description() {
    return this.formGroup.get('description');
  }
}
