import {
  Component,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { NavListComponent } from '../../../components/nav-list/nav-list.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../models/user.model';
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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAuth = input<boolean>(false);

  @Output() logout = new EventEmitter();

  onLogout() {
    this.logout.emit();
  }
}
