import { SharedPipesModule } from './../../shared/pipes/shared-pipes.module';
import { OrderModule } from 'ngx-order-pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PageHeaderModule } from '../../shared';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare, faFingerprint, faCoffee, faCog, faWalking, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';



@NgModule({
    declarations: [UserComponent, UserListComponent, UserUpdateComponent],
    imports: [
      CommonModule,
      UserRoutingModule,
      NgbModule,
      SweetAlert2Module.forRoot(),
      PageHeaderModule,
      ReactiveFormsModule,
      OrderModule,
      SharedPipesModule,
      FormsModule,
      FontAwesomeModule,
    ]
  })
export class UserModule {
    constructor(private library: FaIconLibrary) {
        library.addIcons(faSquare, faCheckSquare, faFingerprint, faCoffee, faCog, faWalking, faQuestionCircle);
    }
 }
