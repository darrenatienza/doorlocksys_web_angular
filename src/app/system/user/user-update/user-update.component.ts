import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared';

@Component({
    selector: 'app-user-update',
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.scss']
})
@AutoUnsubscribe()
export class UserUpdateComponent implements OnInit, OnDestroy {


    @ViewChild('userUpdateForm', { static: false }) content: NgbActiveModal;
    @Input() data;
    modalTitle = '';
    closeResult = '';
    @Output() close_modal_event = new EventEmitter();
    addEditForm: FormGroup;
    userID = 0;
    constructor(private modalService: NgbModal, formBuilder: FormBuilder, private userService: UserService) {
        this.addEditForm = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            fullname: ['', Validators.required],
        });
    }

    ngOnInit() {
        setTimeout(() => {
           
            this.modalTitle = this.data.title;
            this.userID = this.data.userID;
            if (this.data.userID > 0) {
                this.setData();
            }
            
        }, 100);
        
    }
    setData() {
        this.userService.getBy(this.userID).subscribe({
            next: data => {
            this.addEditForm.controls['username'].setValue(data.username);
            this.addEditForm.controls['fullname'].setValue(data.fullname);
            this.addEditForm.controls['username'].disable();
            },
            error: error => {
            },
            complete: () => {
                this.open();
            }
        });
    }
    ngOnDestroy(): void {
    }
    open() {
        this.modalService.open(this.content,
            { centered: false, size: 'xl', backdrop: 'static', scrollable: true }).result.then((result) => {
                // modal close here

                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {

                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
    }

    getDismissReason(reason: any) {
        this.close_modal_event.emit({

        });
        console.log(reason);
    }

    save() {

        const formData = {
            id: 0,
            username: this.addEditForm.controls['username'].value,
            password: this.addEditForm.controls['password'].value,
            fullname: this.addEditForm.controls['fullname'].value
        };
        if (this.data.userID === 0) {
            // add new user
            this.userService.add(formData).subscribe({
                next : next => {
                    this.modalService.dismissAll('Add click');
                },
                //error: error => {},
                complete : () => {}
            });

        } else {
            // edit user
            formData.id = this.userID;
            this.userService.editUser(formData).subscribe({
                next : next => {
                    this.modalService.dismissAll('Edit click');
                },
                error: error => {},
                complete : () => {}
            });
        }

    }
}
