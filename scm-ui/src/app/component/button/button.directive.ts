import { Directive } from '@angular/core';

@Directive({
  selector: 'button[sheelu-button-large],button[stb-button-large],a[sheelu-button-large],a[stb-button-large]',
  host: {'class': 'sheelu-button-lg'}
})

export class ButtonDirective {
  constructor() {
  }
}
