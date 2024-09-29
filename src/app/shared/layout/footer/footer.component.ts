import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavListComponent } from '../../../components/nav-list/nav-list.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, NavListComponent, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
