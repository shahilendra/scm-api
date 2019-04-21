import { Component, Input } from '@angular/core';

@Component({
  selector: 'sheelu-date-display',
  templateUrl: './date-display.component.html',
  styleUrls: ['./date-display.component.scss']
})
export class DateDisplayComponent {

  displayDates = [];
  @Input()
  set selectedDate(val) {
    this.displayDates = [val];
  }
  get selectedDate() {
    return this.displayDates;
  }

  constructor() { }

}
