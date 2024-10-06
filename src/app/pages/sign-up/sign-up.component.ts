import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { take } from 'rxjs';
import { AuthArgs } from '../../shared/models/user.model';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  isLogin: boolean = false;
  private authService = inject(AuthService);
  private lsService = inject(LocalStorageService);

  private router = inject(Router);

  handleRegistration(data: AuthArgs): void {
    this.authService
      .registration(data)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.lsService.setItem('user', response.data.registration);
          this.authService.onIsAuthUser();
          this.router.navigate(['tasks-profile']);
        },
        (error) => {
          throw error;
        }
      );
  }
}
