import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system.component';

const routes: Routes = [
    {
        path: '',
        component: SystemComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
            { path: 'accesslogs', loadChildren: () => import('./accesslog/accesslog.module').then(m => m.AccesslogModule) },
            { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
            { path: 'device-monitor', loadChildren: () => import('./device-monitor/device-monitor.module')
                            .then(m => m.DeviceMonitorModule) },
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule { }
