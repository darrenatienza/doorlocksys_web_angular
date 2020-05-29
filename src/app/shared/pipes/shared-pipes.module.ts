import { FilterPipe } from './filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoolYesNoPipe } from './bool-yes-no.pipe';
import { IntYesNoPipe } from './int-yes-no.pipe';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [BoolYesNoPipe, FilterPipe, IntYesNoPipe],
    exports : [BoolYesNoPipe, FilterPipe, IntYesNoPipe]
})
export class SharedPipesModule { }
