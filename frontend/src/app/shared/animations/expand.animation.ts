import { trigger, state, style, transition, animate } from '@angular/animations';

export const expandAnimation = trigger('expand', [
  state(
    'initial',
    style({
      height: '0',
      overflow: 'hidden',
      opacity: '1',
      visibility: 'hidden'
    })
  ),
  state(
    'expanded',
    style({
      overflow: 'hidden'
    })
  ),
  transition('initial<=>expanded', animate('250ms'))
]);
