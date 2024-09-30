import { NgIf } from '@angular/common';
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

@Component({
  selector: 'app-tasks-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [openCloseAnimation],
})
export class TasksFormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() isOpen: boolean = false;
  @Output() submitForm = new EventEmitter();

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

  get description() {
    return this.formGroup.get('description');
  }
}
