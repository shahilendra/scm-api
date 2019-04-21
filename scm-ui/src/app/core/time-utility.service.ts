import { Injectable } from '@angular/core';

@Injectable()
export class TimeUtilityService {
 timeList: any[] = [];
  constructor() { }
  
  getTimeList() {
    for(let index = 0; index < 96 ;index++){
      this.timeList.push({
        'id': index,
        'time': this.prepareTimeString(index)
      });
    }
   return this.timeList;
  }

  prepareTimeString(timeId: number): string {
  	let result = '';
  	let hours = Math.floor((timeId *15)/ 60);
  	let menutes = ((timeId *15) - hours * 60);
  	let ampmsString = 'AM';
  	if((hours == 12 && menutes > 0) || hours > 12) {
  		ampmsString = 'PM'; 
  	}
  	if( hours > 12) {
  		hours = hours - 12;
  	}
  	result = (hours == 0? '00': hours < 10? '0' + hours: hours.toString());
  	result = result +':' + (menutes == 0? '00': menutes < 10? '0' + menutes: menutes.toString()) + ' ' + ampmsString;
  	return result;
  }

  getDuration(session: any): string {
  	let result = '';
  	let durationSlotNumber;
  	if (session && !isNaN(session.startTime) && !isNaN(session.endTime)) {
  		let tempEndTimeId = session.endTime;
      if (session.startTime > session.endTime) {
      	tempEndTimeId = 96 +  session.endTime;
      }
      durationSlotNumber = tempEndTimeId - session.startTime;
      let hours = Math.floor((durationSlotNumber *15)/ 60);
  	  let menutes = ((durationSlotNumber *15) - hours * 60);
  	  result = (hours == 0? '00': hours < 10? '0' + hours: hours.toString());
  	  result = result +':' + (menutes == 0? '00': menutes < 10? '0' + menutes: menutes.toString());
  	}
  	return result;
  }

  getStartTime(): number {
    let d = new Date();
    let m = d.getMinutes();
    let h = d.getHours();
    let id = Math.ceil((m + h*60)/15);
    return id;
  }

  firstUpper(name: string): string {
    let names = name.split(' ');
    let filterName = [];
    names.forEach((item: string) => {
      item = item.trim();
      item = item
      ? item.length > 1
      ? item.substring(0, 1).toUpperCase() + item.substring(1, item.length).toLowerCase()
      : item.substring(0, 1).toUpperCase()
      : '';
      filterName.push(item);
    });
    name = filterName.join(' ');
    return name;
  }

  toUpper(name: string) : string {
    name = name? name.toUpperCase() : '';
    return name;
  }
}
