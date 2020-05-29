import { Component, OnInit, TemplateRef, ViewChild, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvRecordService, InvDetailService } from '../../../../../shared';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@Component({
    selector: 'app-inv-detail-info-modal',
    templateUrl: './inv-detail-info-modal.component.html',
    styleUrls: ['./inv-detail-info-modal.component.scss']
})
@AutoUnsubscribe()
export class InvDetailInfoModalComponent implements OnInit, OnDestroy {

    @ViewChild('invDetailInfo', { static: false }) content: TemplateRef<any>;
    @Input() data;
    closeResult: string;
    @Output() closed_modal_event = new EventEmitter();
    invDetailDesc = 'Device 1';
    records = [];
    invDetail = {};
    img = 'http://192.168.192.4/core/imagestorage/invdetails/thumbnail.png';

    constructor(private modalService: NgbModal, private invDetailSvc: InvDetailService) { }
    ngOnInit() {
        setTimeout(() => {
            this.open();
            this.loadInvDetail();
        }, 100);
    }
    ngOnDestroy(): void {

    }

    loadInvDetail() {
        this.invDetailSvc.get(this.data.invDetailID).subscribe({
            next: value => {
                this.invDetail = value;
                this.img = 'data:image/png;base64,' + value.imageString;
            },
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
