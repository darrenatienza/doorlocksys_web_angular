import { UserService } from './../../../../../../shared/services/admin/user.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from '../../../../../../shared/entities';

import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
    selector: 'app-read-all-user',
    templateUrl: './read-all-user.component.html',
    styleUrls: ['./read-all-user.component.scss']
})
export class ReadAllUserComponent implements OnInit {
    @Output() show_add_user_event = new EventEmitter();
    @Output() show_edit_user_event = new EventEmitter();
    @ViewChild('comfirmationDeleteSwal', {static: false}) private comfirmationDeleteSwal: SwalComponent;
    @ViewChild('confirmationDeleteSucceedSwal', {static: false}) private confirmationDeleteSucceedSwal: SwalComponent;
    records: User[];
    userID: any;
    criteria = '';

    constructor(private userService: UserService) { }

    ngOnInit() {

        this.loadUsers();
    }
    search() {
        this.loadUsers();
    }
    loadUsers() {
        if (this.criteria !== '') {
            this.userService.getAllBy(this.criteria).subscribe(data => {
                this.records = data;
            }, error => console.error(error)
            );
        } else {
            this.userService.getAll().subscribe(data => {
                this.records = data;
            }, error => console.error(error)
            );
        }

    }
    addUser() {
        this.show_add_user_event.emit({
            title: 'Add User'

        });
    }
    editUser(id) {
        this.show_edit_user_event.emit({
            title: 'Edit User',
            userID: id
        });
    }
    showdeleteUserConfirmation(id) {
        this.userID = id;
        this.comfirmationDeleteSwal.show();
    }
    deleteUser() {
        this.userService.delete(this.userID).subscribe(data => {
            console.log('Deleted');
            this.loadUsers();
            this.confirmationDeleteSucceedSwal.show();
        });
    }

}
