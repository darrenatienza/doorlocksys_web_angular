import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { QtyInvService, ReadOneQtyInv, InvLocationService, InvTypeService, InvStatService } from '../../../../../shared';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { OrderPipe } from 'ngx-order-pipe';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-read-all-qty-inv',
    templateUrl: './read-all-qty-inv.component.html',
    styleUrls: ['./read-all-qty-inv.component.scss']
})
export class ReadAllQtyInvComponent implements OnInit {
    @Output() show_add_edit_qty_inv_event = new EventEmitter();
    @Output() show_print_qty_inv_event = new EventEmitter();
    @Output() show_main_menu_event = new EventEmitter();
    @ViewChild('showDeleteQuestion', { static: false }) private showDeleteQuestion: SwalComponent;
    @ViewChild('showRecordDeleted', { static: false }) private showRecordDeleted: SwalComponent;
    qtyInvID: number;
    constructor(private qtyInvService: QtyInvService,
        private locationSvc: InvLocationService,
        private invTypeSvc: InvTypeService,
        private orderPipe: OrderPipe,
        private cookieSvc: CookieService,
        private invStatSvc: InvStatService, private snackBar: MatSnackBar) { }
    records = [];
    criteria = '';
    status = '';
    location = '';
    type = '';
    page = 1;
    pageSize = 10;
    order = 'invType_Description';
    qtyInvs_searchKey = 'e8b7eaab-d2d1-4cdb-8e95-70a19c81a109';
    reverse = false;
    locations = [];
    types = [];
    stats = [];
    ngOnInit() {


        this.loadLocations();
        this.loadTypes();
        this.loadStatus();

        this.loadSearchValue();
        this.loadQtyInvs();
    }
    loadStatus() {
        this.invStatSvc.getAll().subscribe({
            next: value => this.stats = value,
            error: error => this.throwError(error.message),
            complete: () => {

            }
        });
    }
    loadLocations() {
        this.locationSvc.getAll().subscribe({
            next: value => this.locations = value,
            error: error => this.throwError(error.message),
            complete: () => {

            }
        });
    }
    loadTypes() {
        this.invTypeSvc.getAll().subscribe({
            next: value => this.types = value,
            error: error => this.throwError(error.message),
            complete: () => {
            }
        });
    }
    loadSearchValue() {
        this.criteria = this.cookieSvc.get(this.qtyInvs_searchKey);

        const hasValue = this.cookieSvc.check(this.qtyInvs_searchKey);
        if (hasValue) {
            const obj = JSON.parse(this.cookieSvc.get(this.qtyInvs_searchKey));
            this.location = obj.searchData.location;
            this.type = obj.searchData.type;
            this.status = obj.searchData.status;
        }
    }
    throwError(error: any) {
        throw new Error(error);
    }


    saveSearhValue() {
        const saveData = {
            searchData: {
                location: this.location,
                type: this.type,
                status: this.status
            }
        };
        this.cookieSvc.set(this.qtyInvs_searchKey, JSON.stringify(saveData), 1, '/');
    }

    setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }
        this.order = value;
    }
    close() {
        this.show_main_menu_event.emit({
            title: ''
        });
    }

    /* showInvRecords(qtyInvID: number, invTypeID: number) {
         this.show_inv_record_event.emit({
             title: 'Inventory Records',
             qtyInvID: qtyInvID,
             invTypeID: invTypeID,
         });
     }*/
    showDeleteAlert(id) {
        this.qtyInvID = id;
        this.showDeleteQuestion.show();
    }
    deleteConfirmed() {
        this.qtyInvService.delete(this.qtyInvID).subscribe({
            next: value => console.log(value),
            error: error => this.throwError(error.message),
            complete: () => {
                this.showRecordDeleted.show();
                this.loadQtyInvs();
            }
        });
    }
    edit(id) {
        this.show_add_edit_qty_inv_event.emit({
            title: 'Edit Quantity Inventory',
            qtyInvID: id
        });
    }
    addNew() {
        this.show_add_edit_qty_inv_event.emit({
            title: 'Add New Quantity Inventory',
            qtyInvID: 0
        });
    }
    print() {
        const data = {
            searchData: {
                location: this.location,
                type: this.type,
                status: this.status
            }
        };
        this.show_print_qty_inv_event.emit({
            title: 'Print Preview',
            data: data
        });
    }
    loadQtyInvs() {
        this.qtyInvService.getAllV1_3(this.type, this.location, this.status).subscribe({
            next: value => this.records = value,
            error: error => this.throwError(error.message),
            complete: () => console.log('Command Completed!')
        });
    }
    search() {
        this.loadQtyInvs();
        this.saveSearhValue();
    }


}
