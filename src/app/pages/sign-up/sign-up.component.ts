import { Component, inject } from '@angular/core';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  isLogin: boolean = false;
  private authService = inject(AuthService);
  private lsService = inject(LocalStorageService);

  private router = inject(Router);

  handleRegistration(data: any): void {
    this.authService.registration(data).subscribe(
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
