import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Role, RoleService, UserService, User } from '../../../../../../shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

    @Input() userID;
    @Output() show_read_all_user_event = new EventEmitter();
    @ViewChild('saveConfirmation', {static: false}) private saveConfirmation: SwalComponent;
    roles: Role[];
    editForm: FormGroup;

    constructor(formBuilder: FormBuilder, private roleService: RoleService, private userService: UserService) {
        this.editForm = formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
            firstName: ['', Validators.required],
            middleName: ['', Validators.required],
            lastName: ['', Validators.required],
            role: ['', Validators.required],
        });
    }
    ngOnInit() {
        this.loadRoles();
        this.loadUserData();
    }
    loadUserData() {
        this.userService.getBy(this.userID).subscribe(data => {
            this.editForm.controls['userName'].setValue(data.userName);
            this.editForm.controls['firstName'].setValue(data.firstName);
            this.editForm.controls['middleName'].setValue(data.middleName);
            this.editForm.controls['lastName'].setValue(data.lastName);
            this.editForm.controls['role'].setValue(data.role);
        }, error => console.log(error));
    }
    loadRoles() {
        this.roleService.getAll().subscribe(data => {
            this.roles = data;
        }, error => console.error(error)
        );
    }
    save() {
        this.userService.edit(this.userID, this.editForm.value).subscribe(data => {
            this.saveConfirmation.show();
            this.cancel();
        }, error => console.log(error));
    }
    cancel() {
        this.show_read_all_user_event.emit({
            title: ''
        });
    }

}
