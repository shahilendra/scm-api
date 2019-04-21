import { Pipe, PipeTransform } from '@angular/core';
import { from } from 'rxjs/observable/from';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {

  transform(entities: any[], field: string, value: string): any[] {
    if (!entities || entities.length == 0) return [];

    if (entities.length > 0 && entities[0].hasOwnProperty(field) && value) {
      let list = [];
      const source = from(entities);
      const example = source.pipe(filter((item: any) => item[field].toLowerCase().indexOf(value.toLowerCase()) !== -1));
      example.subscribe(data =>  list.push(data));
      return list;
    } else {
      return entities;
    }    
  }
}
