import { count } from 'rxjs/operators';
import { QtyInvService } from './../../../../../shared/services/inventory/qty-inv.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InvRecordService, InvStatService } from '../../../../../shared';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-print-qty-inv',
    templateUrl: './print-qty-inv.component.html',
    styleUrls: ['./print-qty-inv.component.scss']
})
export class PrintQtyInvComponent implements OnInit {

    @Input() data;
    @Output() show_read_all_qty_inv_event = new EventEmitter();
    records = [];
    dateToday = '';
    storageKey = 'f2f059f7-03bd-4b70-b704-6f854a25d591';
    office: any;
    preparedByName: any;
    designation: any;
    statusList = [];
    selected_status = [];
    showRecordedCount = true;
    showUnRecordedCount = true;
    constructor(private qtyInvSvc: QtyInvService, private statsSvc: InvStatService) {


    }


    ngOnInit() {
        const contentData = JSON.parse(localStorage.getItem(this.storageKey));
        if (contentData) {
            this.office = contentData.footerData.office;
            this.preparedByName = contentData.footerData.preparedByName;
            this.designation = contentData.footerData.designation;
        }
        this.dateToday = formatDate(new Date(), 'yyyy/MM/dd', 'en');
        this.loadStatusList();
        //this.loadInvRecords();


    }

    getSelected() {
        this.records = [];
        this.selected_status = this.statusList.filter(s => {
            return s.selected;
        });
        this.loadInvRecords();

    }
    loadStatusList() {
        this.statsSvc.getAll()
            .subscribe({
                next: value => {
                    value.forEach(v => this.statusList.push(
                        { description: v.description, selected: true }
                    ));
                },
                error: error => console.log(error),
                complete: () => this.getSelected()
            });
    }
    loadInvRecords() {
        console.log(this.data);
        this.qtyInvSvc.getAllV1_4(
            this.data.searchData.status,
            this.data.searchData.type,
            this.data.searchData.location)
            .subscribe({
                next: value => {
                    value.forEach(v => {
                        // create new array of recorded status
                        const rec = [];
                        //  create new array of unrecorded status
                        const un_rec = [];

                        const total = [];
                        // for every status, filter only the checked status by user
                        v.recInvStats.forEach(m => {
                            const u = this.selected_status.filter(x => x.description === m.description).length;
                            if (u > 0) {
                                rec.push(m);
                            }
                        });
                        // for every status, filter only the checked status by user
                        v.unRecInvStats.forEach(m => {
                            const u = this.selected_status.filter(x => x.description === m.description).length;
                            if (u > 0) {
                                un_rec.push(m);
                            }
                        });
                        // To get the total of recorded and un recorded quantities,
                        // use foreach loop from recorded status to get description one by one then
                        // use the description to filter the un recorded status.
                        // check the lenght of un recorded status filtered, if its greater than 1,
                        // get the count of unrecorded status and add it to recorded status
                        // the total will be added to list of totals
                        rec.forEach(z => {
                            const y = un_rec.filter(u => u.description === z.description);
                            if (y.length > 0) {
                               const _total = y[0].count + z.count;
                                total.push(_total);
                            }
                        });
                        // add data to array access by html
                        this.records.push({
                            invType_Description: v.invType_Description,
                            invLocation_Description: v.invLocation_Description,
                            recInvStats: rec,
                            unRecInvStats: un_rec,
                            totals: total
                        });
                    });


                },
                error: error => console.log(error),
                complete: () => console.log('Command Completed!')
            });
    }
    /*loadInvRecords_2() {
        console.log(this.data);
        this.qtyInvSvc.getAllV1_4_1(
            this.data.searchData.status,
            this.data.searchData.type,
            this.data.searchData.location).then(value => {
                value.forEach(v => {
                    const rec = [];
                    const un_rec = [];
                    v.recInvStats.forEach(m => {
                        console.log(this.selected_status);
                        const u = this.selected_status.filter(x => x.description === m.description).length;
                        if (u > 0) {
                            rec.push(m);
                        }
                    });
                    v.unRecInvStats.forEach(m => {
                        const u = this.selected_status.filter(x => x.description === m.description).length;
                        if (u > 0) {
                            un_rec.push(m);
                        }
                    });
                    this.records.push({
                        invType_Description: v.invType_Description,
                        invLocation_Description: v.invLocation_Description,
                        recInvStats: rec,
                        unRecInvStats: un_rec

                    });
                });
            }
            ).catch(error => {
                console.log(error);
            });
    } */
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
        localStorage.setItem(this.storageKey, JSON.stringify(contentData));
    }
    close() {
        this.show_read_all_qty_inv_event.emit({
            title: 'Quantity Inventory'
        });
    }

}
