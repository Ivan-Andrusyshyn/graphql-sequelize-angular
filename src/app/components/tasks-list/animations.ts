import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const translateAnimation = trigger('openClose', [
  state(
    'open',
    style({
      transform: 'translateX(0px)',
    })
  ),
  state(
    'closed',
    style({
      transform: 'translateX(0)',
    })
  ),
  transition('open => closed', [animate('0.8s ease-out')]),
  transition('closed => open', [animate('0.5s ease-in')]),
]);
