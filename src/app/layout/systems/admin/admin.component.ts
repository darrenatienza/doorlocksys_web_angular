import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    animations: [routerTransition()]
})
export class AdminComponent implements OnInit {

    title = '';
    userID = '';
    show_read_all_user_html = true;
    show_add_user_html = false;
    show_edit_user_html = false;

    constructor() { }

    ngOnInit() {

    }
    readAllUser($event){
        this.title = $event.title;
        this.hideAllHtml();
        this.show_read_all_user_html = true;
    }
    addUser($event) {
        this.title = $event.title;
        this.hideAllHtml();
        this.show_add_user_html = true;
    }
    editUser($event) {
        this.title = $event.title;
        this.userID = $event.userID;
        this.hideAllHtml();
        this.show_edit_user_html = true;
    }
    hideAllHtml() {
        this.show_read_all_user_html = false;
        this.show_add_user_html = false;
        this.show_edit_user_html = false;
    }
}
