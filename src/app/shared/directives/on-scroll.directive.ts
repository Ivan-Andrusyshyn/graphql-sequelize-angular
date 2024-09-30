import { Directive, HostListener, Input, signal } from '@angular/core';

@Directive({
  selector: '[appOnScroll]',
  standalone: true,
})
export class OnScrollDirective {
  showOptions = signal<boolean>(false);

  constructor() {}

  @Input('appOnScroll') set options(value: boolean) {
    this.showOptions.set(value);
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (!this.showOptions()) return;
    const element = event.currentTarget as HTMLElement;
    event.preventDefault();
    element.scrollLeft += event.deltaY;
  }
}
