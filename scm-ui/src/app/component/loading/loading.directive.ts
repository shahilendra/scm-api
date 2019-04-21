import { Directive } from '@angular/core';

@Directive({
  selector: '[sheeluLoading]',
  exportAs: 'sheeluLoading',
})

export class LoadingDirective {
  constructor() {
  }
}
