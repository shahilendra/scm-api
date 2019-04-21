import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePicker'
})
export class DatePickerPipe implements PipeTransform {

  private localConfig = {
    dayAbbreviation: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    dayList: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    monthLongList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };


  transform(value: any, args?: any): any {
    if (args === 'undefined') {
      args = 'formatMonth';
    }

    return this[args](value);
  }

  formatMonth(date) {
    return `${date.getFullYear()} ${this.localConfig.monthLongList[date.getMonth()]}`;
  }

  formatDisplay(date) {
    const day = date.getDate();
    return `${this.localConfig.monthList[date.getMonth()]}-${day > 9 ? day : '0' + day} ${this.localConfig.dayList[date.getDay()]}`;
  }

  formatDay(date) {
    return date.getDate();
  }
}
