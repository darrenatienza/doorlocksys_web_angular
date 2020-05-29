import { Component, OnInit, ViewChild } from '@angular/core';
import { RadioButtonItem, RadioButtonComponent } from '../components/radio-button/radio-button.component';
import { DeviceActionService } from '../../shared';

@Component({
  selector: 'app-device-monitor',
  templateUrl: './device-monitor.component.html',
  styleUrls: ['./device-monitor.component.scss']
})
export class DeviceMonitorComponent implements OnInit {

  items: RadioButtonItem[] = [];
  selectedItem: any = '1';
  constructor(private deviceActionService: DeviceActionService) { }

  ngOnInit() {
    this.loadRecords();
  }
  loadRecords() {
    this.deviceActionService.getAll().subscribe({
      next: data => {
        data.forEach(item => {
          // check for selected item
          if (item.isactive > 0) {
            this.selectedItem = item.deviceactionID;
          }
          const a: RadioButtonItem = {
            name: item.actionname,
            value: item.deviceactionID
          };
          // add to list the current item
          this.items.push(a);
        });
      },
      error: next => { },
      complete: () => { }
    });
  }
  change() {
    this.deviceActionService.updateActiveStatus(this.selectedItem).subscribe({
      next: data => {
      },
      error: next => { },
      complete: () => { }
    });
  }

}
