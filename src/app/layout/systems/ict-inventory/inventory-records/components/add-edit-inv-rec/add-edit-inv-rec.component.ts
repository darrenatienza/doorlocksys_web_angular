import { CurrentUser } from '../../../../../../shared/local-storage-manager/current-user';
import { UserActivityService } from './../../../../../../shared/services/log/user-activity.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import {
    ReadOneInvRec,
    InvRecordService, InvTypeService, InvLocationService, InvDetailService, InvStatService, Location, UserActivity
} from '../../../../../../shared';
import { FormBuilder, FormGroup, Validators, FormArrayName } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { JsonPipe } from '@angular/common';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { map, filter, debounceTime, distinctUntilChanged, zip } from 'rxjs/operators';
import { Guid } from 'guid-typescript';



@Component({
    selector: 'app-add-edit-inv-rec',
    templateUrl: './add-edit-inv-rec.component.html',
    styleUrls: ['./add-edit-inv-rec.component.scss']
})
@AutoUnsubscribe()
export class AddEditInvRecComponent implements OnInit, OnDestroy {



    @Input() invRecordID;
    @Input() recordGuid;
    invTypeID;
    addEditForm: FormGroup;
    @Output() show_read_all_inv_record_event = new EventEmitter();
    @ViewChild('saveConfirmation', { static: false }) private saveConfirmation: SwalComponent;
    equipNum = '';
    invTypeCode = '';
    isExists = false;
    isReadOnly = false;

    // List of Inventory Types
    invTypes = [];
    invLocations = [];
    show_InvDetailInfo_Modal = false;
    fieldLogsArray = [];
    add_edit_inv_value = '059c2453-4557-4e1b-87ae-0e7b2d905cee';
    invRecord: ReadOneInvRec;
    rememberToggleModel: any = {
        onColor: 'success',
        offColor: 'danger',
        onText: 'Yes',
        offText: 'No',
        disabled: false,
        size: 'sm',
        value: true
    };
    status = [];
    invDetails = [];
    // Single record Inventory Type
    invType = {};
    data: {};
    isNotFirstLoaded: boolean;
    fieldsArray = ['invLocation'];
    logs: any;
    constructor(formBuilder: FormBuilder,
        private dateformatter: NgbDateParserFormatter,
        private invRecordSvc: InvRecordService,
        private invTypeSvc: InvTypeService,
        private invLocationSvc: InvLocationService,
        private invDetailsSvc: InvDetailService,
        private cookieService: CookieService,
        private invStatSvc: InvStatService,
        private userActivitySvc: UserActivityService) {
        this.addEditForm = formBuilder.group({
            propertyNum: [''],
            invLocation: [''],
            dateAcq: [], // for dates if want to be empty but valid to form omit '' from ['']
            equipNum: ['', Validators.required],
            invDetail: ['', Validators.required],
            invType: ['', Validators.required],
            status: ['', Validators.required],
            remarks: [''],
            isRemember: [false]

        });
        this.addEditForm.controls['equipNum'].disable();
        this.valueChanges();

    }
    ngOnDestroy(): void {

    }
    ngOnInit() {
        this.loadInvLocations();
        this.loadInvTypes();
        this.loadinvStats();
        this.loadLogs();
        if (this.invRecordID > 0) {
            this.setDetails();
            this.addEditForm.controls['isRemember']
                .disable();
            // disable the property number field to avoid duplications
            // and saving errors
        } else {
            this.checkIfRemembered();

        }


    }
    loadLogs() {
        this.userActivitySvc.getRecordActivityLogs(this.recordGuid)
        .subscribe({
            next : value => {
                this.logs = value;
            console.log(this.logs); },
            error : error => console.log(error),
            complete: () => {}
        });
    }
    loadinvStats() {
        this.invStatSvc.getAll().subscribe({
            next: value => { this.status = value; },
            error: err => { throw new Error(err); },
            complete: () => { }
        });
    }
    showInvDetailInfoModal() {
        this.show_InvDetailInfo_Modal = true;
        this.data = {
            invDetailID: this.addEditForm.controls['invDetail'].value
        };
    }
    onClosedInvDetailInfoModal() {
        this.show_InvDetailInfo_Modal = false;
    }
    valueChanges() {
        // Type
        this.selectValueChanges('invType').subscribe(val => {
            this.invDetails = [];
            this.loadInvDetails(val);
            this.genEquipNum(val);
            // this.updateFieldLogsArray('Type', val.description);
        });
        // Property Number
        this.inputValueChanges('propertyNum').subscribe(val => {
            this.invRecordSvc.checkIfExists(val, this.invRecordID).subscribe({
                next: value => {
                    this.isExists = value.isExists;
                },
                error: error => console.log(error),
                complete: () => { }
            });

        });
        /*
        // Equipment Number
        this.inputValueChanges('equipNum').subscribe(val => {
            this.updateFieldLogsArray('Equipment #', val);
        });
         // Date Acquired
         this.inputValueChanges('dateAcq').subscribe(val => {
            this.updateFieldLogsArray('Date Acquired', val);
        });
        // Inventory Details
        this.selectValueChanges('invDetail').subscribe(val => {
            this.updateFieldLogsArray('Detail', val.description);
        });
        // Location
        this.selectValueChanges('invLocation').subscribe(val => {
            this.updateFieldLogsArray('Location', val.description);
        });
        // Status
        this.selectValueChanges('status').subscribe(val => {
            this.updateFieldLogsArray('Status', val.description);
        });
        // Remarks
        this.inputValueChanges('remarks').subscribe(val => {

            this.updateFieldLogsArray('Remarks', val);
        });
        */
    }
    updateFieldLogsArray(fieldName: string, fieldValue: string) {
        const list = this.fieldLogsArray.filter(f => !f.includes(fieldName)); // remove Element
        list.push(
            fieldName + ' : ' + fieldValue
        );
        this.fieldLogsArray = list;
        console.log(this.fieldLogsArray);
    }
    inputValueChanges(ctrlName) {
        return this.addEditForm.get(ctrlName).valueChanges.pipe(
            // get value
            map((event: any) => {
                return event;
            })
            // if character length greater then 2
            , filter(res =>
                res.length > 2)
            // Time in milliseconds between key events
            , debounceTime(1000)
            // If previous query is diffent from current
            , distinctUntilChanged()
            // subscription for response
        );
    }
    selectValueChanges(ctrlName) {
        return this.addEditForm.get(ctrlName).valueChanges.pipe(
            // get value
            map((event: any) => {
                return event;
            })
            // If previous query is diffent from current
            , distinctUntilChanged()
            // subscription for response
        );
    }
    compareFn(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.invLocationID === c2.invLocationID : c1 === c2;
    }
    checkIfRemembered() {
        const value = localStorage.getItem(this.add_edit_inv_value);
        if (value !== null) {
            const obj: ReadOneInvRec = JSON.parse(value);
            if (obj) {
                this.addEditForm.controls['invLocation']
                    .setValue(obj.invLocationID);
                this.addEditForm.controls['invType'].setValue(obj.invTypeID);
                this.onInvTypeChange(obj.invTypeID);
                this.addEditForm.controls['dateAcq']
                    .setValue(this.dateformatter.parse(obj.dateAcquired));

                this.addEditForm.controls['status']
                    .setValue(obj.invStatID);

                this.addEditForm.controls['remarks']
                    .setValue(obj.remarks);
                this.addEditForm.controls['isRemember']
                    .setValue(true);

            }
        }

    }
    rememberToggleChange(value) {
        if (value) {

        }
    }

    getInvTypeCode() {
        let code = '';
        this.invTypeSvc.get(this.invTypeID).subscribe({
            next: value => {
                code = value.code;
            },
            error: error => console.log(error),
            complete: () => { }
        });


    }
    genEquipNum(invTypeID: number) {
        // if edit then no need to generate equip number
        if (this.invRecordID === 0) {
            this.invRecordSvc.genEquipNum(invTypeID).subscribe({
                next: equipNum => {
                    this.addEditForm.controls['equipNum'].setValue(equipNum);
                },
                error: error => console.log(error),
                complete: () => { }

            });
        }
    }

    onInvTypeChange(invTypeId: number) {

    }
    loadInvDetails(invTypeId: number) {
        this.invDetailsSvc.getAllByInvTypeID(invTypeId).subscribe({
            next: value => {
                this.invDetails = value;
                if (this.invRecord !== undefined) {
                    this.addEditForm.controls['invDetail'].setValue(this.invRecord.invDetailID);

                } else {
                    this.addEditForm.controls['invDetail'].setValue('');
                }

            },
            error: error => console.log(error),
            complete: () => {
                console.log('Command Completed');
            }
        });
    }

    setDetails() {
        this.invRecordSvc.get(this.invRecordID).subscribe({
            next: value => {
                // this.defaultValue = value;
                this.invRecord = value;
                this.addEditForm.controls['invLocation']
                .setValue(value.invLocationID);
                this.addEditForm.controls['invType']
                    .setValue(value.invTypeID);

                this.onInvTypeChange(this.invRecord.invTypeID);

                // For setting value on Inventory Detail Dropdown, that is implemented on Load Inventory Details Method

                this.addEditForm.controls['propertyNum']
                    .setValue(this.invRecord.propertyNum);
                this.addEditForm.controls['equipNum']
                    .setValue(this.invRecord.equipNum);

                this.addEditForm.controls['dateAcq']
                    .setValue(this.dateformatter.parse(this.invRecord.dateAcquired));

                this.addEditForm.controls['status']
                    .setValue(this.invRecord.invStatID);

                this.addEditForm.controls['remarks']
                    .setValue(this.invRecord.remarks);

                this.addEditForm.controls['invType']
                    .disable();

                const propNum = this.addEditForm.controls['propertyNum'].value;
                if (propNum !== '') {
                    // temporary comment out for testing
                    // this.addEditForm.controls['propertyNum'].disable();
                }
            },
            error: error => console.log(error),
            complete: () => {


            }
        });
    }
    loadInvLocations() {
        this.invLocationSvc.getAll().subscribe({
            next: value => {
                this.invLocations = [];
                this.invLocations = value;

            },
            error: error => console.log(error),
            complete: () => console.log('Command Completed')
        });

    }
    loadInvTypes() {

        this.invTypeSvc.getAll().subscribe({
            next: value => {
                this.invTypes = [];
                this.invTypes = value;
            },
            error: error => console.log(error),
            complete: () => console.log('Command Completed')
        });


    }
    save() {
        const invRecord: ReadOneInvRec = {
            propertyNum: this.addEditForm.get('propertyNum').value,
            equipNum: this.addEditForm.get('equipNum').value,
            invDetailID: this.addEditForm.get('invDetail').value,
            invLocationID: this.addEditForm.get('invLocation').value,
            dateAcquired: this.dateformatter.format(this.addEditForm.get('dateAcq').value),
            invStatID: this.addEditForm.get('status').value,
            remarks: this.addEditForm.get('remarks').value,
            invTypeID: this.addEditForm.get('invType').value
        };
        // add new record
        if (this.invRecordID === 0) {
            this.invRecordSvc.add(invRecord).subscribe({
                next: value => {
                    if (this.addEditForm.controls['isRemember'].value === true) {

                        localStorage.setItem(this.add_edit_inv_value, JSON.stringify(invRecord));
                    } else {
                        localStorage.removeItem(this.add_edit_inv_value);
                    }
                    // Save Log
                    this.saveUserActivity(value, 'Add New');
                },
                error: error => console.log(error),
                complete: () => {

                    this.saveConfirmation.show();
                    this.close();
                }
            });

        } else {
            // edit record

            this.invRecordSvc.edit(this.invRecordID, invRecord).subscribe({
                next: value => {
                    this.saveUserActivity(value, 'Edit');
                },
                error: error => console.log(error),
                complete: () => {
                    this.saveConfirmation.show();
                    this.close();
                }
            });
        }


    }

    // checks if there was an update done on fields
    saveUserActivity(invRecordGUID: Guid, action: string) {
        let logMessage = 'Updated Fields';
        this.fieldLogsArray.forEach(item => {
            logMessage = logMessage + '\n'
                + item;
        });
        // Save to database
        const userActivity: UserActivity = {
            action: action,
            message: logMessage,
            recordGuid: invRecordGUID,
            userGuid: new CurrentUser().userGuid
        };
        this.userActivitySvc.add(userActivity).subscribe({
            next: value => { },
            error: error => { },
            complete: () => { }
        }
        );

    }
    // Change Events for Logs
    datePickerChange($event, controlName: string) {

        this.updateFieldLogsArray(controlName, $event);
    }
    inputChange($event, controlName: string) {
        this.updateFieldLogsArray(controlName, $event);
    }
    selectChanged(value, controlName: string) {
        this.updateFieldLogsArray(controlName, value);
    }
    close() {

        this.fieldsArray.forEach(f => {

        });
        this.show_read_all_inv_record_event.emit({ title: 'Inventory Records' });
    }


}
