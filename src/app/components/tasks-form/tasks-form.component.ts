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
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-tasks-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '200px',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          height: '0',
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class TasksFormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Output() submitForm = new EventEmitter();
  isOpen = false;

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
