import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  constructor() { }
  collapedSideBar: boolean;
  ngOnInit() {
  }
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
}

}
