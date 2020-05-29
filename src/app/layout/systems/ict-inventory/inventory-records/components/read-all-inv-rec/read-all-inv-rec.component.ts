import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import {
    InvRecordService,
    InvTypeService,
    InvLocationService,
    InventoryLocalStorage,
    IInventoryLocalStorage
} from '../../../../../../shared';



@Component({
    selector: 'app-read-all-inv-rec',
    templateUrl: './read-all-inv-rec.component.html',
    styleUrls: ['./read-all-inv-rec.component.scss']
})
export class ReadAllInvRecComponent implements OnInit, OnDestroy {


    @Output() show_add_edit_inv_rec_event = new EventEmitter();
    @Output() show_main_menu_event = new EventEmitter();
    @Output() show_print_inv_rec_event = new EventEmitter();
    @ViewChild('showDeleteQuestion', { static: false }) private showDeleteQuestion: SwalComponent;
    @ViewChild('showRecordDeleted', { static: false }) private showRecordDeleted: SwalComponent;
    invRecordID = 0;

    localData: IInventoryLocalStorage;
    cookieValue = 'UNKNOWN';
    order = 'propertyNum';
    reverse = false;
    saveDataKey = '762223c3-0442-4ed6-87bf-b6ea160a1d54';
    constructor(private invRecordSvc: InvRecordService,
        private locationSvc: InvLocationService,
        private invTypeSvc: InvTypeService) { }
    records = [];
    criteria = '';
    cookieSearchKey = 'invRecords_search';
    status = '';
    location = '';
    type = '';
    locations = [];
    types = [];
    page = 1;
    pageSize = 10;
    statusList = [
        {
            description: 'OK'
        },
        {
            description: 'For Repair'
        },
        {
            description: 'For Condemn'
        },
        {
            description: 'For Warranty'
        },
        {
            description: 'Condemned - Property Office'
        }

    ];
    ngOnInit() {
        this.localData = new InventoryLocalStorage();
        this.loadSearchValue();
        this.loadInvRecords();
        this.loadLocations();
        this.loadTypes();
    }
    ngOnDestroy(): void {

    }
    loadLocations() {
        this.locationSvc.getAll().subscribe({
            next: value => this.locations = value,
            error: error => console.log(error),
            complete: () => {

            }
        });
    }
    loadTypes() {
        this.invTypeSvc.getAll().subscribe({
            next: value => this.types = value,
            error: error => console.log(error),
            complete: () => {
            }
        });
    }
    loadSearchValue() {
        this.location = this.localData.location;
        this.criteria = this.localData.criteria;
        this.type = this.localData.type;
        this.status = this.localData.status;

    }
    saveSearhValue() {
        this.localData.location = this.location;
        this.localData.status = this.status;
        this.localData.type = this.type;
        this.localData.criteria = this.criteria;
        this.localData.save();
    }
    print() {
        const data = {
            searchData: {
                criteria: this.criteria,
                location: this.location,
                type: this.type,
                status: this.status
            }
        };
        this.show_print_inv_rec_event.emit({
            title: 'Print Inventory Record',
            data: data
        });
    }
    showDeleteAlert(id) {
        this.invRecordID = id;
        this.showDeleteQuestion.show();
    }
    deleteConfirmed() {
        this.invRecordSvc.delete(this.invRecordID).subscribe({
            next: value => console.log(value),
            error: error => console.log(error),
            complete: () => {
                this.showRecordDeleted.show();
                this.loadInvRecords();
            }
        });
    }
    edit(id, recordGuid) {
        this.show_add_edit_inv_rec_event.emit({
            title: 'Edit Inventory Record',
            invRecordID: id,
            recordGuid: recordGuid
        });
    }
    addNew() {
        this.show_add_edit_inv_rec_event.emit({
            title: 'Add New Inventory Record',
            invRecordID: 0
        });
    }
    loadInvRecords() {
        this.invRecordSvc.getAllV1_2(this.criteria, this.status, this.type, this.location).subscribe({
            next: value => this.records = value,
            error: error => console.log(error),
            complete: () => console.log('Command Completed!')
        });
    }
    search() {
        this.loadInvRecords();
        this.saveSearhValue();
    }
    close() {
        this.show_main_menu_event.emit({
            title: 'Main Menu'
        });
    }
    setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }
        this.order = value;
    }

}
