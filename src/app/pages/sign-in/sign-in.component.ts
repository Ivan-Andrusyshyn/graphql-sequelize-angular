import { Component, inject } from '@angular/core';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../shared/services/auth.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  isLogin: boolean = true;
  private authService = inject(AuthService);
  private lsService = inject(LocalStorageService);
  private router = inject(Router);

  handleLogin(data: any): void {
    console.log('Registration Data:', data);
    this.authService.login(data).subscribe(
      (response) => {
        this.lsService.setItem('user', response.data.registration);
        this.router.navigate(['tasks-profile']);
      },
      (error) => {
        throw error;
      }
    );
  }
}
