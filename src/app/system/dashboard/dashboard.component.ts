import { DeviceActionService } from './../../shared/services/doorlocksys/device-action.service';
import { AccesslogService } from './../../shared/services/accesslog/accesslog.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../shared';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    userCount: any;
    date = formatDate(Date.now(), 'yyyy-MM-dd', 'en');
    accesslogCount: any;
    deviceAction: any;
    constructor(private userService: UserService, private accesslog: AccesslogService, private deviceActionService: DeviceActionService) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: '',
                text: ''
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: '',
                text:
                    ''
            }
        );
    }

    ngOnInit() {
        //this.getUsersCount();
        //this.getAccessLogCount();

        // this.getDeviceActiveStatus(); /** Not needed since device not sending its  status */
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    getUsersCount() {
        this.userService.getAllBy('').subscribe({
            next: data => {
                this.userCount = data.length;
            },
            error: err => { },
            complete: () => { }

        });
    }
    getAccessLogCount() {
        this.accesslog.getAll(this.date, '').subscribe({
            next: data => {
                this.accesslogCount = data.length;
            },
            error: err => {  },
            complete: () => { }

        });
    }
    getDeviceActiveStatus() {
        this.deviceActionService.getActiveDeviceAction().subscribe({
            next: data => {
                this.deviceAction = data.actionname;
            },
            error: err => {},
            complete: () => { }

        });
    }
}
