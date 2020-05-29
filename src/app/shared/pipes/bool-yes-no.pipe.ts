import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolYesNo'
})
export class BoolYesNoPipe implements PipeTransform {

  transform(value: boolean, args?: any): any {
    return value ? 'Yes' : 'No';
  }

}
