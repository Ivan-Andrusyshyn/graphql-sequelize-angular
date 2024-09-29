import { ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  @Input() isLogin: boolean = true;
  @Output() submitForm = new EventEmitter<User>();

  authForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      username: ['Tests', Validators.required],
      password: ['Tests1234', Validators.required],
      email: ['tests@1234'],
    });

    if (this.isLogin) {
      this.authForm.get('email')?.clearValidators();
      this.authForm.get('email')?.updateValueAndValidity();
    } else {
      this.authForm
        .get('email')
        ?.setValidators([Validators.required, Validators.email]);
    }
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      this.submitForm.emit(this.authForm.value);
      this.authForm.reset();
    }
  }
}
