import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SgPanelComponent } from '../sg-panel/sg-panel.component';
import { SgPanelRoutingModule } from './sg-panel-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageHeaderModule, StatModule } from '../../../shared';
import { AddNewReportComponent } from './components/add-new-report/add-new-report.component';
import { ReadAllReportComponent } from './components/read-all-report/read-all-report.component';
import { EditReportComponent } from './components/edit-report/edit-report.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrintReportComponent } from './components/print-report/print-report.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { AddNewStudentComponent } from '../student/component/student-records/add-new-student/add-new-student.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
   // tslint:disable-next-line:max-line-length
   imports: [CommonModule, SgPanelRoutingModule, PageHeaderModule, NgbModule, ReactiveFormsModule, NgxPrintModule, FormsModule, SweetAlert2Module.forRoot(),
    StatModule],
  declarations:
  [SgPanelComponent, AddNewReportComponent,
    ReadAllReportComponent, EditReportComponent, PrintReportComponent, MainMenuComponent ]
})

export class SgPanelModule { }
