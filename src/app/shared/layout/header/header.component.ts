import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { NavListComponent } from '../../../components/nav-list/nav-list.component';
import { User } from '../../models/user.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HeaderComponent,
    NgIf,
    RouterLink,
    RouterLinkActive,
    FooterComponent,
    NavListComponent,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  isAuth$!: Observable<boolean>;

  @Output() logout = new EventEmitter();

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuth$;
  }

  onLogout() {
    this.logout.emit();
  }
}
