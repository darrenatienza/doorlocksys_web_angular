import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { InvRecordService } from '../../../../../../shared';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@Component({
    selector: 'app-show-inv-record-list-modal',
    templateUrl: './show-inv-record-list-modal.component.html',
    styleUrls: ['./show-inv-record-list-modal.component.scss']
})
@AutoUnsubscribe()
export class ShowInvRecordListModalComponent implements OnInit, OnDestroy {

    @ViewChild('imageUpload', { static: false }) content: TemplateRef<any>;
    @Input() data;
    closeResult: string;
    @Output() closed_modal_event = new EventEmitter();
    invDetailDesc = 'Device 1';
    records = [];
    constructor(private modalService: NgbModal, private invRecordsSvc: InvRecordService) { }
    ngOnInit() {
        setTimeout(() => {
            this.open();
            this.loadInvRecords();
            this.invDetailDesc =  this.data.invDetailDesc;
        }, 100);
    }
    ngOnDestroy(): void {

    }

    loadInvRecords() {
        this.invRecordsSvc.getAllByInvDetailID(this.data.invDetailID).subscribe({
            next: value => this.records = value,
            error: error => console.log(error),
            complete: () => { }

        });
    }
    open() {
        this.modalService.open(this.content,
            { centered: true, size: 'lg', backdrop: 'static', scrollable: true }).result.then((result) => {
                // modal close here

                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
    }
    getDismissReason(reason: any) {
        this.closed_modal_event.emit({

        });
        console.log(reason);
    }

}
