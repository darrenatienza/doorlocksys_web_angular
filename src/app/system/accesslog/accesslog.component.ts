import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccesslogService } from '../../shared';
import { ThrowStmt } from '@angular/compiler';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-accesslog',
    templateUrl: './accesslog.component.html',
    styleUrls: ['./accesslog.component.scss']
})
export class AccesslogComponent implements OnInit {

    records = [];
    order = 'propertyNum';
    reverse = false;
    date: any;
    criteria = '';
    page = 1;
    pageSize = 50;
    constructor(private accesslogservice: AccesslogService, private dateFormatter: NgbDateParserFormatter) {
        this.date = this.dateFormatter.parse(formatDate(Date.now(), 'yyyy-MM-dd', 'en'));

    }

    ngOnInit() {

        this.loadRecords();
    }

    loadRecords() {
        const dateStr = this.dateFormatter.format(this.date);
        this.accesslogservice.getAll(dateStr, this.criteria).subscribe({
            next: data => {
                this.records = data;
            },
            error: error => { },
            complete: () => { }

        });
    }
    search() {
        this.loadRecords();
    }
}
