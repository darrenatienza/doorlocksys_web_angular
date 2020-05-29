import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { AccesslogComponent } from './accesslog/accesslog.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserComponent } from './user/user.component';
import { DeviceMonitorComponent } from './device-monitor/device-monitor.component';
import { FormsModule } from '@angular/forms';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare, faFingerprint, faCoffee, faCog, faWalking, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';




@NgModule({
    declarations: [SystemComponent, SidebarComponent, HeaderComponent],
    imports: [
        CommonModule,
        SystemRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        SweetAlert2Module.forRoot(),

    ]
})
export class SystemModule {

    constructor(private library: FaIconLibrary) {
        library.addIcons(faSquare, faCheckSquare, faFingerprint, faCoffee, faCog, faWalking, faQuestionCircle);
    }
}
