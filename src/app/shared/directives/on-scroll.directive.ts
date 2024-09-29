import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnScroll]',
  standalone: true,
})
export class OnScrollDirective {
  constructor() {}

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    const element = event.currentTarget as HTMLElement;
    event.preventDefault();
    element.scrollLeft += event.deltaY;
  }
}
