import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { AccesslogComponent } from './accesslog.component';
import { AccesslogRoutingModule } from './accesslog-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbPagination, NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [AccesslogComponent],
  imports: [
    CommonModule,
    AccesslogRoutingModule,
    PageHeaderModule,
    SweetAlert2Module.forRoot(),
    NgbModule,
    FormsModule
  ]
})
export class AccesslogModule { }
