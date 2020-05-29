import { IInventoryLocalStorage } from './../../../../../../shared/local-storage-manager/interfaces/iinventory-local-storage';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { InvRecordService, InventoryLocalStorage } from '../../../../../../shared';


@Component({
    selector: 'app-print-inventory-record',
    templateUrl: './print-inventory-record.component.html',
    styleUrls: ['./print-inventory-record.component.scss']
})
export class PrintInventoryRecordComponent implements OnInit {


    @Input() data;
    @Output() show_read_all_inv_rec_event = new EventEmitter();
    records = [];
    dateToday = '';
    invRecordReportKey = 'a9e1c025-bf19-41bc-99e3-4cf97161249c';
    office: any;
    preparedByName: any;
    designation: any;
    localData: IInventoryLocalStorage;
    constructor(private invRecSvc: InvRecordService, ) {
        this.localData = new InventoryLocalStorage();

    }


    ngOnInit() {
        const contentData = JSON.parse(localStorage.getItem(this.invRecordReportKey));
        if (contentData) {
            this.office = contentData.footerData.office;
            this.preparedByName = contentData.footerData.preparedByName;
            this.designation = contentData.footerData.designation;
        }
        this.dateToday = formatDate(new Date(), 'yyyy/MM/dd', 'en');
        this.loadInvRecords();
    }
    loadInvRecords() {
        console.log(this.data);
        this.invRecSvc.getAllV1_2(
            this.localData.criteria,
           this.localData.status,
           this.localData.type,
           this.localData.location)
            .subscribe({
                next: value => this.records = value,
                error: error => console.log(error),
                complete: () => console.log('Command Completed!')
            });
    }
    print() {

    }
    saveData() {
        const contentData = {
            footerData: {
                office: this.office,
                preparedByName: this.preparedByName,
                designation: this.designation
            }
        };
        localStorage.setItem(this.invRecordReportKey, JSON.stringify(contentData));
    }
    close() {
        this.show_read_all_inv_rec_event.emit({
            title: 'Inventory Records'
        });
    }
}
