import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule, StatModule } from '../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AddUserComponent } from './component/user/add-user/add-user.component';
import { EditUserComponent } from './component/user/edit-user/edit-user.component';
import { ReadAllUserComponent } from './component/user/read-all-user/read-all-user.component';


@NgModule({

    imports: [CommonModule, AdminRoutingModule, PageHeaderModule,
        NgbModule, ReactiveFormsModule, FormsModule, SweetAlert2Module.forRoot(),
        StatModule],
    declarations:
        // Add all components here
        [AdminComponent, AddUserComponent, EditUserComponent, ReadAllUserComponent]
})
export class AdminModule { }
