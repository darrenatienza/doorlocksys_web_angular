

import { StatModule } from './../../shared/modules/stat/stat.module';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { ToggleButtonComponent } from './../components/toggle-button/toggle-button.component';
import { NgToggleModule } from '@nth-cloud/ng-toggle';
import { DeviceMonitorRoutingModule } from './device-monitor-routing.module';
import { DeviceMonitorComponent } from './device-monitor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { RadioButtonComponent } from '../components/radio-button/radio-button.component';
import { FormsModule } from '@angular/forms';
import { SysStatModule } from '../components/sys-stat/sys-stat.module';




@NgModule({
    declarations: [DeviceMonitorComponent, ToggleButtonComponent, RadioButtonComponent],
    imports: [
        CommonModule,
        DeviceMonitorRoutingModule,
        FontAwesomeModule,
        NgToggleModule,
        UiSwitchModule,
        FormsModule,
        SysStatModule,
        StatModule
    ]
})
export class DeviceMonitorModule {


}
