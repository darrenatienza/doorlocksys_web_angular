import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgToggleModule } from '@nth-cloud/ng-toggle';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IctInventoryComponent } from './ict-inventory.component';
import { IctInventoryRoutingModule } from './ict-inventory-routing.module';
import { PageHeaderModule, StatModule, NumberDirective } from '../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MultiFilterPipe } from '../../../shared/pipes/multi-filter.pipe';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PrintInventoryRecordComponent } from './inventory-records/components/print-inventory-record/print-inventory-record.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AddEditQuantityInventoryComponent } from './quantity-inventory/add-edit-quantity-inventory/add-edit-quantity-inventory.component';
import { ReadAllInvDetailsComponent } from './inventory-details/read-all-inv-details/read-all-inv-details.component';
import { AddEditInvDetailComponent } from './inventory-details/add-edit-inv-detail/add-edit-inv-detail.component';
import { CookieService } from 'ngx-cookie-service';
import { OrderModule } from 'ngx-order-pipe';
import { ReadAllInvRecComponent } from './inventory-records/components/read-all-inv-rec/read-all-inv-rec.component';
import { AddEditInvRecComponent } from './inventory-records/components/add-edit-inv-rec/add-edit-inv-rec.component';
import { NgxPrintModule } from 'ngx-print';
import { ReadAllQtyInvComponent } from './quantity-inventory';
import { PrintQtyInvComponent } from './quantity-inventory/print-qty-inv/print-qty-inv.component';
import { UploadImageModule } from '../../../shared/modules/upload-image/upload-image.module';
import { ShowInvRecordListModalComponent } from './inventory-records/components/show-inv-record-list-modal/show-inv-record-list-modal.component';
import { InvDetailInfoModalComponent } from './inventory-details/inv-detail-info-modal/inv-detail-info-modal.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
@NgModule({
    // tslint:disable-next-line:max-line-length
    imports: [CommonModule, IctInventoryRoutingModule,
        PageHeaderModule, NgbModule, UploadImageModule, ImageCropperModule,
        ReactiveFormsModule, FormsModule, StatModule, NgToggleModule, SweetAlert2Module.forRoot(), OrderModule, NgxPrintModule],
    declarations: [IctInventoryComponent,
        MultiFilterPipe, MainMenuComponent,
        PrintInventoryRecordComponent, ReadAllQtyInvComponent,
        AddEditQuantityInventoryComponent,
        ReadAllInvDetailsComponent,
        AddEditInvDetailComponent,
        ReadAllInvRecComponent,
        AddEditInvRecComponent,
        NumberDirective, PrintQtyInvComponent,
        ShowInvRecordListModalComponent,
        InvDetailInfoModalComponent],
    providers: [CookieService],
})
export class IctInventoryModule { }
