import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { InvDetailService, InvTypeService } from '../../../../../shared';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-read-all-inv-details',
    templateUrl: './read-all-inv-details.component.html',
    styleUrls: ['./read-all-inv-details.component.scss']
})
@AutoUnsubscribe()
export class ReadAllInvDetailsComponent implements OnInit, OnDestroy {


    @Output() show_add_edit_inv_detail_event = new EventEmitter();
    @Output() show_main_menu_event = new EventEmitter();
    @ViewChild('showDeleteQuestion', { static: false }) private showDeleteQuestion: SwalComponent;
    @ViewChild('showRecordDeleted', { static: false }) private showRecordDeleted: SwalComponent;
    invDetailID: number;
    order = 'description';
    reverse = false;
    constructor(private invDetailService: InvDetailService,
        private invTypeSvc: InvTypeService,
        private logger: NGXLogger) { }
    records = [];
    show_inv_record_list_modal = false;
    criteria = '';
    invRecordListModalData: any;
    page = 1;
    pageSize = 10;
    types = [];
    type = '';
    ngOnInit() {
        this.loadInvDetails();
        this.loadInvTypes();
    }
    loadInvTypes() {
        this.invTypeSvc.getAll().subscribe({
            next: value => { this.types = value; },
            error: err => { throw new Error(err); },
            complete: () => { }
        });
    }
    ngOnDestroy(): void {
    }
    showInvRecordListModal(id: number, desc: string) {
        this.invRecordListModalData = {
            invDetailID: id,
            invDetailDesc: desc
        };

        this.show_inv_record_list_modal = true;
    }
    onClosedInvRecordListModal() {
        this.show_inv_record_list_modal = false;
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
    showDeleteAlert(id) {
        this.invDetailID = id;
        this.showDeleteQuestion.show();
    }
    deleteConfirmed() {
        this.invDetailService.delete(this.invDetailID).subscribe({
            next: value => console.log(value),
            error: error => console.log(error),
            complete: () => {
                this.showRecordDeleted.show();
                this.loadInvDetails();
            }
        });
    }
    edit(id) {
        this.show_add_edit_inv_detail_event.emit({
            title: 'Edit Inventory Detail',
            invDetailID: id
        });
    }
    addNew() {
        this.show_add_edit_inv_detail_event.emit({
            title: 'Add New Inventory Detail',
            invDetailID: 0
        });
    }
    loadInvDetails() {
        this.invDetailService.getAll(this.criteria, this.type).subscribe(
            value => { this.records = value; },
            err => { throw new Error(err.message); },
            () => { }
        );

    }
    search() {
        this.loadInvDetails();
    }

}
