
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit, ViewChild } from '@angular/core';

import { routerTransition } from '../router.animations';
import { AuthService, CurrentUser } from '../shared';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    login_user_form: FormGroup;
    error_message = '';
    alerts: Array<any> = [];
    @ViewChild('loginFailedConfirmation', { static: false }) private loginFailedConfirmation: SwalComponent;

    constructor(
        private router: Router,
        private authService: AuthService,
        formBuilder: FormBuilder) {
        this.login_user_form = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    ngOnInit() {
        this.authService.onLogOut();
    }

    onLoggedin() {
        this.authService.onLogin(this.login_user_form.value)
            .subscribe({
                next: data => {
                    if (data) {
                        // Save Token and current user to local storage
                        localStorage.setItem('token', data);
                        this.router.navigate(['system']);
                    }
                }
                , error: error => {
                    this.loginFailedConfirmation.show();
                },
                complete: () => { }
            }
            );


    }

}
