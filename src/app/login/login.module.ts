import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Http import LoadingBarHttpModule:
 import { LoadingBarHttpModule } from '@ngx-loading-bar/http';

// for Router import LoadingBarRouterModule:
 import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import LoadingBarModule:
 import { LoadingBarModule } from '@ngx-loading-bar/core';
 import { LazyLoadImageModule } from 'ng-lazyload-image';
@NgModule({
    imports: [NgxSpinnerModule, CommonModule, LoginRoutingModule, FormsModule,
        LazyLoadImageModule, ReactiveFormsModule,
        NgbModule, SweetAlert2Module.forRoot()
     ],
    declarations: [LoginComponent]
})
export class LoginModule { }
