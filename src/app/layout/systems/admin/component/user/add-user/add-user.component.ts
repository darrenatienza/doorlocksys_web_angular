import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { Role } from './../../../../../../shared/entities/admin/role';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { RoleService, UserService } from '../../../../../../shared';

import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    @Output() show_read_all_user_event = new EventEmitter();
    @ViewChild('saveConfirmation', {static: false}) private saveConfirmation: SwalComponent;
    roles: Role[];
    addNewForm: FormGroup;
    constructor(formBuilder: FormBuilder, private roleService: RoleService, private userService: UserService) {
        this.addNewForm = formBuilder.group({
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
    }

    loadRoles() {
        this.roleService.getAll().subscribe(data => {
            this.roles = data;
        }, error => console.error(error)
        );
    }
    save() {
        this.userService.add(this.addNewForm.value).subscribe(data => {
            this.cancel();
            this.saveConfirmation.show();
        }, error => console.log(error));
    }
    cancel() {
        this.show_read_all_user_event.emit({
            title: ''
        });
    }

}
