import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const opacityAnimation = trigger('openClose', [
  state(
    'open',
    style({
      width: '275px',
      opacity: 1,
    })
  ),
  state(
    'closed',
    style({
      width: '0',
      opacity: 0,
    })
  ),
  transition('open => closed', [animate('0.5s')]),
  transition('closed => open', [animate('0.5s')]),
]);
