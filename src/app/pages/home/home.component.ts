import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  lsService = inject(LocalStorageService);
  isAuth = signal<boolean>(false);

  ngOnInit(): void {
    const usersData = !!this.lsService.getItem('user');
    this.isAuth.set(!!usersData);
  }
}
