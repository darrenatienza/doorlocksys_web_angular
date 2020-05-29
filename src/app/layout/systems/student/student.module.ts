
import { SharedDirectivesModule } from './../../../shared/directives/shared-directives.module';
import { SharedPipesModule } from './../../../shared/pipes/shared-pipes.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { PageHeaderModule, StatModule } from '../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AddNewStudentComponent } from './component/student-records/add-new-student/add-new-student.component';
import { EditStudentComponent } from './component/student-records/edit-student/edit-student.component';
import { StudentComponent } from './student.component';
import { ReadAllStudentComponent } from './component/student-records/read-all-student/read-all-student.component';
import { MainMenuComponent } from './component/main-menu/main-menu.component';
import { ReadAllStudentRequestComponent } from './component/student-request/read-all-student-request/read-all-student-request.component';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgToggleModule } from '@nth-cloud/ng-toggle';
import { NgxPrintModule } from 'ngx-print';
import { AddEditComponent } from './component/student-request/add-edit/add-edit.component';
import { PrintStudentRequestComponent } from './component/student-request/print-student-request/print-student-request.component';

@NgModule({
    imports: [ CommonModule, StudentRoutingModule, PageHeaderModule, NgbModule,
        ReactiveFormsModule, FormsModule, SweetAlert2Module.forRoot(),
        StatModule, UiSwitchModule, NgToggleModule, NgxPrintModule, SharedPipesModule],
    declarations:
        [StudentComponent, AddNewStudentComponent,
            EditStudentComponent, ReadAllStudentComponent,
            StudentComponent, MainMenuComponent, ReadAllStudentRequestComponent, AddEditComponent, PrintStudentRequestComponent]
})
export class StudentModule { }
