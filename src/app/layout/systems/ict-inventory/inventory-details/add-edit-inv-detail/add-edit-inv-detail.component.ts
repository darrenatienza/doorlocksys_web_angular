import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { InvDetailService, InvTypeService, InvDetail } from '../../../../../shared';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable, Observer } from 'rxjs';

@Component({
    selector: 'app-add-edit-inv-detail',
    templateUrl: './add-edit-inv-detail.component.html',
    styleUrls: ['./add-edit-inv-detail.component.scss']
})
@AutoUnsubscribe()
export class AddEditInvDetailComponent implements OnInit, OnDestroy {


    @Input() invDetailID;
    addEditForm: FormGroup;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    invTypes = [];
    show_upload_image = false;
    @Output() show_read_all_inv_detail_event = new EventEmitter();
    @Output() show_add_new_inv_detail_event = new EventEmitter();
    @ViewChild('saveConfirmation', { static: false }) private saveConfirmation: SwalComponent;
    imageUrl = 'assets/images/thumbnail.png';
    img = '';
    constructor(formBuilder: FormBuilder,
        private invDetailSvc: InvDetailService,
        private invTypeSvc: InvTypeService,
        private dateformatter: NgbDateParserFormatter) {
        this.addEditForm = formBuilder.group({
            description: ['', Validators.required],
            invType: ['', Validators.required],
            specs: ['', Validators.required],
            otherDetails: [''],
        });
    }
    ngOnInit() {

        this.loadInvTypes();
        if (this.invDetailID > 0) {
            this.setDetails();

        } else {
            // convert image from url to base 64 image
            this.getBase64ImageFromURL(this.imageUrl).subscribe(base64data => {
                console.log(base64data);
                this.img = 'data:image/jpg;base64,' + base64data;
            });
        }
    }
    ngOnDestroy(): void {

    }
    getBase64ImageFromURL(url: string) {
        return Observable.create((observer: Observer<string>) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;
            if (!img.complete) {
                img.onload = () => {
                    observer.next(this.getBase64Image(img));
                    observer.complete();
                };
                img.onerror = (err) => {
                    observer.error(err);
                };
            } else {
                observer.next(this.getBase64Image(img));
                observer.complete();
            }
        });
    }

    getBase64Image(img: HTMLImageElement) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
    showUploadImage() {
        this.show_upload_image = true;

    }
    loadInvTypes() {
        this.invTypeSvc.getAll().subscribe({
            next: value => this.invTypes = value,
            error: error => console.log(error),
            complete: () => console.log('Command Completed')
        });
    }
    onUpdateImage($event) {
        if ($event.data.image_data !== '') {
            this.img = $event.data.image_data;
        }
        this.show_upload_image = false;
    }
    onImageUploadClosed() {
        this.show_upload_image = false;
    }
    save() {
        const invDetail: InvDetail = {

            invTypeID: this.addEditForm.controls['invType'].value,
            description: this.addEditForm.controls['description'].value,
            specs: this.addEditForm.controls['specs'].value,
            otherDetails: this.addEditForm.controls['otherDetails'].value,
            imageString: this.img.replace(/^data:image\/[a-z]+;base64,/, '')
        };
        // add new record
        if (this.invDetailID === 0) {
            this.invDetailSvc.add(invDetail).subscribe({
                next: value => { console.log(value); },
                error: error => console.log(error),
                complete: () => {
                    this.saveConfirmation.show();
                    this.close();
                }
            });
        } else {
            // edit record

            this.invDetailSvc.edit(this.invDetailID, invDetail).subscribe({
                next: value => { console.log(value); },
                error: error => console.log(error),
                complete: () => {
                    this.saveConfirmation.show();
                    this.close();
                }
            });
        }

    }

    /*setDetails() {
            let invDetail: InvDetail;
            this.invDetailSvc.get(this.invDetailID).subscribe({
                next: value => invDetail = value,
                error: error => console.log(error),
                complete: () => {
                    this.addEditForm.controls['invType'].setValue(invDetail.invTypeID);
                    this.addEditForm.controls['description'].setValue(invDetail.description);
                    this.addEditForm.controls['specs'].setValue(invDetail.specs);
                    this.addEditForm.controls['otherDetails'].setValue(invDetail.otherDetails);
                    this.img = 'data:image/png;base64,' + invDetail.imageString;
                }
            });

        }*/
    setDetails() {
        let invDetail: InvDetail;
        this.invDetailSvc.get(this.invDetailID).subscribe({
            next: value => invDetail = value,
            error: error => console.log(error),
            complete: () => {
                this.addEditForm.controls['invType'].setValue(invDetail.invTypeID);
                this.addEditForm.controls['description'].setValue(invDetail.description);
                this.addEditForm.controls['specs'].setValue(invDetail.specs);
                this.addEditForm.controls['otherDetails'].setValue(invDetail.otherDetails);
                this.img = 'data:image/png;base64,' + invDetail.imageString;
            }
        });

    }
    /*
    async setDetails() {
       const invDetail =  await this.invDetailSvc.get(this.invDetailID).toPromise();
       this.addEditForm.controls['invType'].setValue(invDetail.invTypeID);
       this.addEditForm.controls['description'].setValue(invDetail.description);
       this.addEditForm.controls['specs'].setValue(invDetail.specs);
       this.addEditForm.controls['otherDetails'].setValue(invDetail.otherDetails);
       this.img = 'data:image/png;base64,' + invDetail.imageString;


   }*/
    close() {
        this.show_read_all_inv_detail_event.emit({ title: '' });
    }
}
