import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../shared/services/auth.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  isLogin: boolean = true;
  private authService = inject(AuthService);
  private lsService = inject(LocalStorageService);
  private router = inject(Router);

  handleLogin(data: any): void {
    this.authService
      .login(data)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.lsService.setItem('user', response.data.login);
          this.authService.onIsAuthUser();
          this.router.navigate(['tasks-profile']);
        },
        (error) => {
          throw error;
        }
      );
  }
}
