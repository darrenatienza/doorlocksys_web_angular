import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {
    QtyInvService,
    ReadOneQtyInv,
    InvTypeService,
    InvLocationService,
    InvRecordService,
    ReadAllInvStat,
    ReadAllQtyInv,
    InvStatService
} from '../../../../../shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
    selector: 'app-add-edit-quantity-inventory',
    templateUrl: './add-edit-quantity-inventory.component.html',
    styleUrls: ['./add-edit-quantity-inventory.component.scss']
})
export class AddEditQuantityInventoryComponent implements OnInit {

    @Input() qtyInvID;
    addEditForm: FormGroup;
    @Output() show_read_all_qty_inv_event = new EventEmitter();
    @ViewChild('saveConfirmation', {static: false}) private saveConfirmation: SwalComponent;

    invTypes = [];
    invLocations = [];
    invStats = [];
    constructor(formBuilder: FormBuilder,
        private dateformatter: NgbDateParserFormatter,
        private qtyInvSvc: QtyInvService,
        private invTypeSvc: InvTypeService,
        private invLocationSvc: InvLocationService,
        private invRecordSvc: InvRecordService,
        private invStatSvc: InvStatService) {
        this.addEditForm = formBuilder.group({
            invType: ['', Validators.required],
            invLocation: ['', Validators.required],
            count: [0, Validators.required],
            remarks: [''],
            invStat: [''],
        });
    }

    ngOnInit() {
        this.loadInvLocations();
        this.loadInvTypes();
        this.loadInvStats();
        if (this.qtyInvID > 0) {
            this.setDetails();
        }
    }
    loadInvStats() {
        this.invStatSvc.getAll().subscribe({
            next: value => this.invStats = value,
            error: error => console.log(error),
            complete: () => {
                console.log('Completed');
            }
        });
    }
    setDetails() {
        let qtyInv: ReadOneQtyInv;

        this.qtyInvSvc.get(this.qtyInvID).subscribe({
            next: value => qtyInv = value,
            error: error => console.log(error),
            complete: () => {
                this.addEditForm.controls['invLocation'].setValue(qtyInv.invLocationID);
                this.addEditForm.controls['invType'].setValue(qtyInv.invTypeID);
                this.addEditForm.controls['count'].setValue(qtyInv.count);
                this.addEditForm.controls['invStat'].setValue(qtyInv.invStatID);
                this.addEditForm.controls['remarks'].setValue(qtyInv.remarks);
                this.addEditForm.controls['invType'].disable();
            }
        });
    }
    addCount() {
        let count = this.addEditForm.controls['count'].value;
        count++;
        this.addEditForm.controls['count'].setValue(count);
    }
    minusCount() {
        let count = this.addEditForm.controls['count'].value;
        // decrement until zero if the operation is add new (qtyInvID is zero means add new record)
        if (count > 0) {
                count--;
        }

        this.addEditForm.controls['count'].setValue(count);
    }
    validateInvRecordCount(count: number) {
        this.invRecordSvc.getCountByQtyInv(this.qtyInvID).subscribe({
            next: value => {
                if (count > value) {
                    count--;
                    this.addEditForm.controls['count'].setValue(count);
                }
            },
            error: error => console.log(error),
            complete: () => console.log('Command Completed')
        });
    }
    loadInvLocations() {
        this.invLocationSvc.getAll().subscribe({
            next: value => this.invLocations = value,
            error: error => console.log(error),
            complete: () => console.log('Command Completed')
        });
    }
    loadInvTypes() {
        this.invTypeSvc.getAll().subscribe({
            next: value => this.invTypes = value,
            error: error => console.log(error),
            complete: () => console.log('Command Completed')
        });
    }
    save() {
        const qtyInv: ReadOneQtyInv = {
            qtyInvID: this.qtyInvID,
            invLocationID: this.addEditForm.controls['invLocation'].value,
            invTypeID: this.addEditForm.controls['invType'].value,
            count: this.addEditForm.controls['count'].value,
            remarks: this.addEditForm.controls['remarks'].value,
            invStatID: this.addEditForm.controls['invStat'].value,

        };
        // add new record
        if (this.qtyInvID === 0) {
            this.qtyInvSvc.add(qtyInv).subscribe({
                next: value => { console.log(value); },
                error: error => console.log(error),
                complete: () => {
                    this.saveConfirmation.show();
                    this.close();
                }
            });
        } else {
            // edit record

            this.qtyInvSvc.edit(this.qtyInvID, qtyInv).subscribe({
                next: value => { console.log(value); },
                error: error => console.log(error),
                complete: () => {
                    this.saveConfirmation.show();
                    this.close();
                }
            });
        }

    }



    close() {
        this.show_read_all_qty_inv_event.emit({ title: 'Quantity Inventory' });
    }


}
