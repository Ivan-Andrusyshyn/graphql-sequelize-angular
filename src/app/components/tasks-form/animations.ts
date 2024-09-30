import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const openCloseAnimation = trigger('openClose', [
  state(
    'open',
    style({
      height: '200px',
      opacity: 1,
    })
  ),
  state(
    'closed',
    style({
      height: '0',
      opacity: 0,
    })
  ),
  transition('open => closed', [animate('0.8s')]),
  transition('closed => open', [animate('0.5s')]),
]);
