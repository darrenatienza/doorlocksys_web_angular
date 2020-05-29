import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-sys-stat',
    templateUrl: './sys-stat.component.html',
    styleUrls: ['./sys-stat.component.scss']
})
export class SysStatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() data: number;
    @Input() actionTitle: string;
    @Input() link: string;
    @Input() target: string;
    @Input() status: string;
    @Output() event: EventEmitter<any> = new EventEmitter();
    constructor() { }

    ngOnInit() {
    }

}
