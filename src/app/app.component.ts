import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { User } from './shared/models/user.model';
import { LocalStorageService } from './shared/services/local-storage.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isAuth = signal<boolean>(false);

  private lsService = inject(LocalStorageService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    const user: User | null = this.lsService.getItem('user');
    if (user && user.token) {
      this.isAuth.set(true);
    } else {
      this.router.navigate(['home']);
      this.isAuth.set(false);
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['home']);
    this.isAuth.set(false);
  }
}
