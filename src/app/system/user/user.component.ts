import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from '../../shared';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {



    show_user_list = true;
    show_user_update = false;
    data: any;
    constructor() { }

    ngOnInit() {

    }

    showUserUpdateForm($event) {
        this.data = $event;
        this.show_user_update = true;
    }

    closeUserUpdateForm() {
        this.show_user_update = false;
    }

}
