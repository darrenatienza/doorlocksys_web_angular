import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnChanges, SimpleChange } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserService } from '../../../shared';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges {


    @Output() show_UserUpdateForm_event = new EventEmitter();
    @Input() show_user_update;
    records = [];
    order = 'propertyNum';
    reverse = false;
    @ViewChild('showDeleteQuestion', { static: false }) private showDeleteQuestion: SwalComponent;
    @ViewChild('showRecordDeleted', { static: false }) private showRecordDeleted: SwalComponent;
    @ViewChild('alert', { static: false }) private alert: SwalComponent;
    @ViewChild('fingerprintAlert', { static: false }) private fingerprintAlert: SwalComponent;
    id: any;
    registerFingerPrint: boolean;
    criteria = '';
    page = 1;
    pageSize = 20;
    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loadRecords();
    }
    ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
        this.loadRecords();
    }
    loadRecords() {
        this.userService.getAllBy(this.criteria).subscribe({
            next: data => {
                this.records = data;
                const filter = this.records.filter(a =>
                    a.fingerprints === '0');
                if (filter.length > 0) {
                    this.registerFingerPrint = true;
                } else {
                    this.registerFingerPrint = false;
                }
            },
            //error: error => { throw new Error(error); },
            complete: () => { }

        });
    }
    resetFinger(id) {
        this.id = id;
        this.fingerprintAlert.title = 'Warning';
        this.fingerprintAlert.text = 'Do you want to finger print to selected record?';
        this.fingerprintAlert.type = 'warning';
        this.fingerprintAlert.showConfirmButton = false;
        this.fingerprintAlert.showCancelButton = true;
        this.fingerprintAlert.show();
        this.fingerprintAlert.confirm.subscribe({
            next: next => {
                this.userService.resetFinger(id).subscribe({
                    next: data2 => {
                        this.alert.title = 'Notificition';
                        this.alert.text = 'Finger print has been deleted!';
                        this.alert.type = 'success';
                        this.alert.show();
                        this.loadRecords();
                    },
                    //error: error => { },
                    complete: () => { }
                });
            }
        });

    }
    search() {
        this.loadRecords();
    }
    edit(id) {
        this.show_UserUpdateForm_event.emit({
            title: 'Edit User',
            userID: id
        });
    }
    delete(id) {
        this.id = id;

        this.userService.getCurrentUser().subscribe({
            next: data => {
                if (data.userid === this.id) {
                    this.alert.title = 'Notification';
                    this.alert.text = 'You cannot delete current login user!';
                    this.alert.type = 'error';
                    this.alert.show();
                } else {
                    this.showDeleteQuestion.show();
                    this.showDeleteQuestion.confirm.subscribe({
                        next: next => {
                            this.userService.delete(id).subscribe({
                                next: data2 => {
                                    this.loadRecords();
                                    this.showRecordDeleted.show();
                                },
                                //error: error => { },
                                complete: () => { }
                            });
                        }
                    });
                }
            },
            //error: error => { },
            complete: () => { }
        });


    }
    add() {
        // check if a user not yet register there finger print
        if (!this.registerFingerPrint) {
            this.show_UserUpdateForm_event.emit({
                title: 'Add New User',
                userID: 0
            });
        } else {
            this.alert.title = 'Notification';
            this.alert.text = 'Please register fingerprint of previous recorded user before adding new one!';
            this.alert.type = 'error';
            this.alert.show();

        }
    }

}
