import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'multiFilter'
})
export class MultiFilterPipe implements PipeTransform {

    transform(items: Array<any>, multiFilter: { [key: string]: any }): Array<any> {
        if (!items) { return []; }
        if (!multiFilter) { return  items; }
        return items.filter(item => {
             const notMatchingField = Object.keys(multiFilter)
                                     .find(key => item[key].toLowerCase().indexOf(multiFilter[key].toLowerCase()));

            return !notMatchingField; // true if matches all fields
        });

    }

}
