import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sg-panel',
  templateUrl: './sg-panel.component.html',
  styleUrls: ['./sg-panel.component.scss'],
  animations: [routerTransition()]
})
export class SgPanelComponent implements OnInit {
    title = '';
    property_record_id;
    show_read_all_report_html = false;
    show_add_new_report_html = false;
    show_edit_report_html = false;
    show_print_report_html = false;
    show_main_menu_html = true;
    reportID = '';
    dateFrom = '';
    dateTo = '';
  constructor() { }

  ngOnInit() {

  }
  readAllReport(event) {
    // set title and product ID
    this.title = event.title;
    // hide all html then show only one html
    this.hideAll_Html();
    this.show_read_all_report_html = true;
    this.dateFrom = event.dateFrom;
    this.dateTo = event.dateTo;
  }
  addNewReport($event) {
    // set title and product ID
    this.title = $event.title;

    // hide all html then show only one html
    this.hideAll_Html();
    this.show_add_new_report_html = true;
    this.dateFrom = $event.dateFrom;
    this.dateTo = $event.dateTo;
  }
  showMainMenu($event) {
    // set title and product ID
    this.title = $event.title;

    // hide all html then show only one html
    this.hideAll_Html();
    this.show_main_menu_html = true;
  }
  printReport($event) {
    // set title and product ID
    this.title = $event.title;

    // hide all html then show only one html
    this.hideAll_Html();
    this.show_print_report_html = true;
    this.dateFrom = $event.dateFrom;
    this.dateTo = $event.dateTo;
  }
  editReport($event) {
    // set title and product ID
    this.title = $event.title;
    this.reportID = $event.reportID;
    // hide all html then show only one html
    this.hideAll_Html();
    this.show_edit_report_html = true;
    this.dateFrom = $event.dateFrom;
    this.dateTo = $event.dateTo;
  }
  hideAll_Html() {
    this.show_read_all_report_html = false;
    this.show_add_new_report_html = false;
    this.show_edit_report_html = false;
    this.show_print_report_html = false;
    this.show_main_menu_html = false;
  }
}
