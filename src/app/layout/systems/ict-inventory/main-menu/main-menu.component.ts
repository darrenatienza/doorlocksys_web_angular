import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
    @Output() show_read_all_qty_inv_event = new EventEmitter();
    @Output() show_read_all_inv_detail_event = new EventEmitter();
    @Output() show_read_all_inv_rec_event = new EventEmitter();
    constructor() { }

    ngOnInit() {
    }
    showQuantityInventory() {
        this.show_read_all_qty_inv_event.emit({
            title: 'Quantity Inventory'
        });
    }

    showInventoryDetails() {
        this.show_read_all_inv_detail_event.emit({
            title: 'Inventory Details'
        });
    }
    showInvRecords() {
        this.show_read_all_inv_rec_event.emit({
            title: 'Inventory Records'
        });
    }

}
