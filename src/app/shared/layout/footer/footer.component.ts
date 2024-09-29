import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavListComponent } from '../../../components/nav-list/nav-list.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, NavListComponent, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  isAuth: boolean = false;
}
