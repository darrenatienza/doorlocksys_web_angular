import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Guid } from 'guid-typescript';

@Component({
    selector: 'app-ict-inventory',
    templateUrl: './ict-inventory.component.html',
    styleUrls: ['./ict-inventory.component.scss'],
    animations: [routerTransition()]
})
export class IctInventoryComponent implements OnInit {
    title = '';

    //Inventory Record
    show_read_all_inv_record_html = false;
    show_add_edit_inv_record_html = false;
    show_print_inv_record_html = false;
    show_read_all_inv_rec_html_v1_1 = false;
    show_add_edit_inv_rec_html_v1_1 = false;
    invRecordID = 0;
    invTypeID = 0;
    recordGuid: Guid;
    show_main_menu_html = true;
    showBackButton = false;

    //quantity inventory
    show_read_all_qty_inv_html = false;
    show_add_edit_qty_inv_html = false;
    show_print_qty_inv_html = false;
    qtyInvID = 0;

    //Inventory Details
    show_read_all_inv_detail_html = false;
    show_add_edit_inv_detail_html = false;
    invDetailID = 0;
    data = { };

    constructor() { }

    ngOnInit() {
    }

    // Main Menu
    showMainMenu($event) {
        this.title = $event.title;
        this.hideAll_Html();
        this.show_main_menu_html = true;
    }


    // Inventory Details
    readAllInvDetails($event) {
        this.title = $event.title;
        this.hideAll_Html();
        this.show_read_all_inv_detail_html = true;
    }
    addEditInvDetail($event) {
        this.title = $event.title;
        this.invDetailID = $event.invDetailID;
        this.hideAll_Html();
        this.show_add_edit_inv_detail_html = true;
        this.invDetailID = $event.invDetailID;
    }



    // Quantity Inventory
    readAllQtyInv($event) {
        this.title = $event.title;
        this.hideAll_Html();
        this.show_read_all_qty_inv_html = true;
    }
    addEditQtyInv($event) {
        this.title = $event.title;
        this.hideAll_Html();
        this.show_add_edit_qty_inv_html = true;
        this.qtyInvID = $event.qtyInvID;

    }
    printQtyInv($event) {
        this.title = $event.title;
        this.data = $event.data;
        this.hideAll_Html();
        this.show_print_qty_inv_html = true;
    }

    back() {
        // set title and product ID
        this.title = '';
        // hide all html then show only one html
        this.hideAll_Html();
        this.show_read_all_inv_record_html = true;
        this.showBackButton = false;
    }
    // Inventory Record
    readAllInvRecord($event) {
        // set title and product ID
        this.title = $event.title;
        // hide all html then show only one html
        this.qtyInvID = $event.qtyInvID;
        this.invTypeID = $event.invTypeID;
        this.hideAll_Html();
        this.show_read_all_inv_rec_html_v1_1 = true;
        this.showBackButton = false;
    }

    /*----- Inventory Record ----*/
    readAllInvRecordV1_1($event) {
        // Version 1.1 of read all inventory records

        // set title and product ID
        this.title = $event.title;
        // hide all html then show only one html
        this.hideAll_Html();
        this.show_read_all_inv_rec_html_v1_1 = true;
        this.showBackButton = false;
    }
    addEditInvRecordV1_1($event) {
        // set title and product ID
        this.title = $event.title;
        this.invRecordID = $event.invRecordID;
        this.recordGuid = $event.recordGuid;
        // hide all html then show only one html
        this.hideAll_Html();
        this.show_add_edit_inv_rec_html_v1_1 = true;
        this.showBackButton = true;
    }

    addEditInvRecord($event) {
        // set title and product ID
        this.title = $event.title;
        this.invRecordID = $event.invRecordID;
        this.qtyInvID = $event.qtyInvID;
        this.invTypeID = $event.invTypeID;
        // hide all html then show only one html
        this.hideAll_Html();
        this.show_add_edit_inv_record_html = true;
        this.showBackButton = true;
    }

    printInventory($event) {
        // set title and product ID
        this.title = $event.title;
        this.data = $event.data;
        // hide all html then show only one html
        this.hideAll_Html();
        this.show_print_inv_record_html = true;
        this.showBackButton = true;
    }
    /*----/Inventory Record-----*/

    hideAll_Html() {
        this.show_read_all_inv_detail_html = false;
        this.show_add_edit_inv_detail_html = false;
        this.show_read_all_qty_inv_html = false;
        this.show_read_all_inv_record_html = false;
        this.show_add_edit_inv_record_html = false;
        this.show_print_inv_record_html = false;
        this.show_add_edit_qty_inv_html = false;
        this.show_main_menu_html = false;
        this.show_read_all_inv_rec_html_v1_1 = false;
        this.show_add_edit_inv_rec_html_v1_1 = false;
        this.show_print_qty_inv_html = false;
    }
}
