import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
    @Output() show_read_all_report_html = new EventEmitter();
    constructor() { }

    ngOnInit() {
    }
    showReportList() {
        this.show_read_all_report_html.emit({
            title: ''
        });
    }

}
