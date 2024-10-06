import { ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthArgs, User } from '../../shared/models/user.model';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit {
  @Input() isLogin: boolean = true;
  @Output() submitForm = new EventEmitter<AuthArgs>();

  private fb = inject(FormBuilder);

  authForm!: FormGroup;

  ngOnInit(): void {
    this.authForm = this.fb.group({
      username: ['Tests32a32b', Validators.required],
      email: ['dominos12@icloud.com'],
      password: ['Dominos1212356', Validators.required],
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
