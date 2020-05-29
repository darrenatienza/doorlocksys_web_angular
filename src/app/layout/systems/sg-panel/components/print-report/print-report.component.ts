
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReportService, ISGPrintFooterLS, SGPrintFooterLS } from '../../../../../shared';

@Component({
    selector: 'app-print-report',
    templateUrl: './print-report.component.html',
    styleUrls: ['./print-report.component.scss']
})
export class PrintReportComponent implements OnInit {
    footerKey = '0ca9fb70-cee4-46f0-96e8-57237dfa68a8';
    dean: string;
    coordinator: string;
    preparedByName: string;
    verifiedByName: string;
    reviewedByName: string;
    preparedByDesignation: string;
    verifiedByDesignation: string;
    reviewedByDesignation: string;
    approvedByDesignation: string;
    approvedByName: string;
    localData: ISGPrintFooterLS;

    constructor(private reportservice: ReportService) {
        this.localData = new SGPrintFooterLS();
    }
    @Input() dateFrom;
    @Input() dateTo;
    @Output() show_read_all_report_html = new EventEmitter();
    records = [];
    ngOnInit() {
        this.loadData();
        this.loadReportList();
    }
    loadReportList() {
        this.reportservice.getAll(this.dateFrom, this.dateTo).subscribe(data => {
            this.records = data;
        });
    }
    close() {
        // tell the parent component (AppComponent)
        this.show_read_all_report_html.emit({
            title: '',
            dateFrom: this.dateFrom,
            dateTo: this.dateTo
        });
    }

    loadData() {
        this.approvedByDesignation = this.localData.approvedByDesignation;
        this.approvedByName = this.localData.approvedByName;
        this.preparedByDesignation = this.localData.preparedByDesignation;
        this.preparedByName = this.localData.preparedByName;
        this.reviewedByDesignation = this.localData.reviewedByDesignation;
        this.reviewedByName = this.localData.reviewedByName;
        this.verifiedByDesignation = this.localData.verifiedByDesignation;
        this.verifiedByName = this.localData.verifiedByName;
    }
    saveData() {
        this.localData.approvedByDesignation = this.approvedByDesignation;
        this.localData.approvedByName = this.approvedByName;
        this.localData.preparedByDesignation = this.preparedByDesignation;
        this.localData.preparedByName = this.preparedByName;
        this.localData.reviewedByDesignation = this.reviewedByDesignation;
        this.localData.reviewedByName = this.reviewedByName;
        this.localData.verifiedByDesignation = this.verifiedByDesignation;
        this.localData.verifiedByName = this.verifiedByName;
        this.localData.save();
    }
}
