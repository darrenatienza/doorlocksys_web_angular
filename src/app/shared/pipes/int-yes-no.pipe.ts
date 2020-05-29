import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intYesNo'
})
export class IntYesNoPipe implements PipeTransform {

    transform(value: number, args?: any): any {
        return value > 0 ? 'Yes' : 'No';
      }

}
