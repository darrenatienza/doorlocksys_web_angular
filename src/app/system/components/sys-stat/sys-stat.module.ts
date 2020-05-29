import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysStatComponent } from './sys-stat.component';


@NgModule({
  imports: [CommonModule],
    declarations: [SysStatComponent],
    exports: [SysStatComponent]
})
export class SysStatModule { }
