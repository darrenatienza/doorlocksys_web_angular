
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from '../../../../../shared';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { formatDate } from '@angular/common';


@Component({
    selector: 'app-read-all-report',
    templateUrl: './read-all-report.component.html',
    styleUrls: ['./read-all-report.component.scss'],
    styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})

export class ReadAllReportComponent implements OnInit {


    @Output() show_add_new_report_event = new EventEmitter();
    @Output() show_edit_report_event = new EventEmitter();
    @Output() show_view_details_report_event = new EventEmitter();
    @Output() show_delete_report_event = new EventEmitter();
    @Output() show_print_report_event = new EventEmitter();
    @Output() show_main_menu_event = new EventEmitter();
    @ViewChild('deleteSwal', {static: false}) private deleteSwal: SwalComponent;
    @ViewChild('deleteConfirmSwal', {static: false}) private deleteConfirmSwal: SwalComponent;
    sgReport_dateFrom = 'sgReport_dateFrom';
    sgReport_dateTo = 'sgReport_dateTo';
    closeResult: string;
    records = [];
    dateToObj = this.parserFormatter.parse(formatDate(Date.now(), 'yyyy-MM-dd', 'en'));
    dateFromObj = this.parserFormatter.parse(formatDate(Date.now(), 'yyyy-MM-dd', 'en'));
    dateFrom = localStorage.getItem(this.sgReport_dateFrom);
    dateTo = localStorage.getItem(this.sgReport_dateTo);
    isSearch = false;
    name = 'asdfadf';
    reportID: any;

    constructor(private modalService: NgbModal, private reportservice: ReportService, private parserFormatter: NgbDateParserFormatter) { }
    ngOnInit() {
        this.validateDates();
        this.loadReportList();
    }
    // check if there is locally stored date from and date to to avoid null errors
    // then set it to search date models
    validateDates() {
        if (this.dateFrom === null) {
            localStorage.setItem(this.sgReport_dateFrom, formatDate(Date.now(), 'yyyy-MM-dd', 'en'));
        }
        if (this.dateTo === null) {
            localStorage.setItem(this.sgReport_dateTo, formatDate(Date.now(), 'yyyy-MM-dd', 'en'));
        }
        this.dateToObj = this.parserFormatter.parse(localStorage.getItem(this.sgReport_dateTo));
        this.dateFromObj = this.parserFormatter.parse(localStorage.getItem(this.sgReport_dateFrom));
    }
    loadReportList() {
        this.dateFrom = localStorage.getItem(this.sgReport_dateFrom);
        this.dateTo = localStorage.getItem(this.sgReport_dateTo);
        this.reportservice.getAll(this.dateFrom, this.dateTo).subscribe(data => {
            this.records = data;
        });

    }
    showMainMenu() {
        this.show_main_menu_event.emit({
            title: ''
        });
    }
    open(content, reportID) {
        this.modalService.open(content, { centered: true, size: 'sm' }).result.then((result) => {
            // modal close here
            if (result === 'Yes') {
                this.deleteReport(reportID);
            }
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    ToDateStr(val) {
        return this.parserFormatter.format(val);
    }
    openSearch(searchContent) {
        this.modalService.open(searchContent, { centered: true, size: 'sm' }).result.then((result) => {
            // modal close here
            if (result === 'Search') {
                // store search date from and to on local storage for future filtering use
                localStorage.setItem(this.sgReport_dateFrom, this.ToDateStr(this.dateFromObj));
                localStorage.setItem(this.sgReport_dateTo, this.ToDateStr(this.dateToObj));
                this.loadReportList();
            }
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    deleteReport(reportID: number) {
        this.reportservice.delete(reportID).subscribe(data => {
            console.log('Deleted');
            this.loadReportList();
            this.deleteConfirmSwal.show();
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    addNewReport() {

        // tell the parent component (AppComponent)
        this.show_add_new_report_event.emit({
            title: 'Add New'

        });

    }
    editReport(id) {
        // tell the parent component (AppComponent)
        this.show_edit_report_event.emit({
            title: 'Edit',
            reportID: id,


        });
    }
    showDeleteAlert(id) {
        this.reportID = id;
        this.deleteSwal.show();
    }
    /*print() {
        let printContents, popupWin;
        printContents = document.getElementById('print').innerHTML;
        popupWin = window.open('', '_blank');
        popupWin.document.write(`
        <!DOCTYPE html>
        <html lang="en">

        <head>
          <meta charset="utf-8">
          <title>Print</title>
        </head>
        <body  onload="window.print()">
        <div class="page">
        ${printContents}
        </div>

        </body>

        </html>
    `
        );
        popupWin.document.close();
    }*/
    print() {
        // tell the parent component (AppComponent)
        this.show_print_report_event.emit({
            title: '',
            dateFrom: localStorage.getItem(this.sgReport_dateFrom),
            dateTo: localStorage.getItem(this.sgReport_dateTo)
        });
    }
}
