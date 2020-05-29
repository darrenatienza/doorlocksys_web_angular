import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit, AfterViewInit {

    @ViewChild('imageUpload', {static: false}) content: TemplateRef<any>;
    @Output() onUpdateImageEvent = new EventEmitter();
    @Output() onClosedEvent = new EventEmitter();
    imageChangedEvent: any = '';
    croppedImage: any = '';
    closeResult = '';

    constructor(private modalService: NgbModal) { }

    ngOnInit() {

    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.open();
        }, 100);

    }
    open() {
        this.modalService.open(this.content, { centered: true, size: 'lg', backdrop: 'static' }).result.then((result) => {
            // modal close here
            this.onUpdateImageEvent.emit({
                data: {
                    image_data: this.croppedImage
                }
            });
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    getDismissReason(reason: any) {
        this.onClosedEvent.emit();
        console.log(reason);
    }


    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
}
