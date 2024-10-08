import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFilterComponent {}
