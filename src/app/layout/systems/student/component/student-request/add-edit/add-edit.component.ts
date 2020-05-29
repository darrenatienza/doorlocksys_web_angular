
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import {
    StudentService,
    StudentReqTypeService, SchoolyearService, LocationService, StudentReqService, StudentReq
} from '../../../../../../shared';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { formatDate, DatePipe } from '@angular/common';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],

})
export class AddEditComponent implements OnInit {
    @Input() studentReqID = 0;

    isExists = true;
    fullName = '';
    addEditForm: FormGroup;
    studentReqTypes = [];
    schoolYears = [];
    locations = [];
    @Output() show_read_all_student_request_event = new EventEmitter();
    @Output() show_add_new_student_event = new EventEmitter();
    availableToggleModel: any = {
        onColor: 'success',
        offColor: 'danger',
        onText: 'Yes',
        offText: 'No',
        disabled: false,
        size: 'sm',
        value: true
    };
    claimToggleModel: any = {
        onColor: 'success',
        offColor: 'danger',
        onText: 'Yes',
        offText: 'No',
        disabled: false,
        size: 'sm',
        value: true
    };
    semesters: any = [{
        description: '1st Semester'
    },
    { description: '2nd Semester' },
    { description: 'Summer' }
    ];
    studentID: number;
    @ViewChild('saveConfirmation', {static: false}) private saveConfirmation: SwalComponent;
    disableClaimedControl = true;
    isNotAvailable = true;
    isClaimed: boolean;
    isReadOnlySrCode: boolean;
    isUpdatetable: boolean;
    constructor(formBuilder: FormBuilder,
        private studentService: StudentService, private studentReqTypeService: StudentReqTypeService,
        private schoolyearService: SchoolyearService, private locationService: LocationService,
        private dateformatter: NgbDateParserFormatter, private studentReqService: StudentReqService) {
        this.addEditForm = formBuilder.group({
            createDate: ['', Validators.required],
            srCode: ['', Validators.required],
            studentReqType: ['', Validators.required],
            receiptNum: [''],
            schoolYear: ['', Validators.required],
            semester: ['', Validators.required],
            isAvailable: [{ value: false, disabled: false }, Validators.required],
            isClaimed: [{ value: false, disabled: true }, Validators.required],
            location: ['', Validators.required],
            claimedDate: [''],
            reason: ['', Validators.required],
            remarks: [''],
        });
    }
    ngOnInit() {
        this.loadStudentReqTypes();
        this.loadSchoolYears();
        if (this.studentReqID > 0) {
            this.loadStudentReqDetail();

        }
    }
    addNewStudent() {
        this.show_add_new_student_event.emit({
            title: 'Add New Student',
            parentCaller: 'add_student_request'
        });
    }
    loadStudentReqDetail() {
        this.studentReqService.getDetails(this.studentReqID).subscribe({
            next: value => {
                this.setDetails(value);
            },
            error: error => console.log(error),
            complete: () => console.log('Command Completed')
        });


    }
    availableToggleChange(value: boolean) {
        // after click from value = true
        // the toggle will slide to false
        // means that the other control that
        // need to disable because the isAvailable
        // control is false now
        if (value) {
            this.addEditForm.controls['isClaimed'].enable();
            this.isNotAvailable = false;

        } else {
            this.addEditForm.controls['isClaimed'].disable();
            this.isNotAvailable = true;
            this.addEditForm.controls['isClaimed'].setValue(false);
        }
    }
    claimedToggleChange(value: boolean) {
        this.isClaimed = value;
        if (value) {
            const dateStr = formatDate(new Date(), 'yyyy-MM-dd', 'en');
            this.addEditForm.controls['claimedDate'].setValue(this.dateformatter.parse(dateStr));
        }

    }
    save() {
        const studentreq: StudentReq = {

            studentID: this.studentID,
            createDate: this.dateformatter.format(this.addEditForm.controls['createDate'].value),
            studentReqTypeID: this.addEditForm.controls['studentReqType'].value,
            receiptNum: this.addEditForm.controls['receiptNum'].value,
            schoolYearID: this.addEditForm.controls['schoolYear'].value,
            semester: this.addEditForm.controls['semester'].value,
            isAvailable: this.addEditForm.controls['isAvailable'].value,
            isClaimed: this.addEditForm.controls['isClaimed'].value,
            locationID: this.addEditForm.controls['location'].value,
            claimedDate: this.dateformatter.format(this.addEditForm.controls['claimedDate'].value),
            reason: this.addEditForm.controls['reason'].value,
            remarks: this.addEditForm.controls['remarks'].value
        };
        // add new record
        if (this.studentReqID === 0) {
            studentreq.claimedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
            this.studentReqService.add(studentreq).subscribe({
                next: value => { console.log(value); },
                error: error => console.log(error),
                complete: () => {
                    this.saveConfirmation.show();
                    this.cancel();
                }
            });
        } else {
            // edit record
            studentreq.claimedDate = this.dateformatter.format(this.addEditForm.controls['claimedDate'].value);
            this.studentReqService.edit(this.studentReqID, studentreq).subscribe({
                next: value => { console.log(value); },
                error: error => console.log(error),
                complete: () => {
                    this.saveConfirmation.show();
                    this.cancel();
                }
            });
        }

    }


    setDetails(value: StudentReq) {
        this.addEditForm.controls['createDate'].setValue(this.dateformatter.parse(value.createDate));
        this.addEditForm.controls['srCode'].setValue(value.studentSrCode);
        this.addEditForm.controls['studentReqType'].setValue(value.studentReqTypeID);
        this.addEditForm.controls['receiptNum'].setValue(value.receiptNum);
        this.addEditForm.controls['schoolYear'].setValue(value.schoolYearID);
        this.addEditForm.controls['semester'].setValue(value.semester);
        this.addEditForm.controls['isAvailable'].setValue(value.isAvailable);
        this.addEditForm.controls['isClaimed'].setValue(value.isClaimed);
        this.addEditForm.controls['location'].setValue(value.locationID);
        this.addEditForm.controls['claimedDate'].setValue(this.dateformatter.parse(value.claimedDate));
        this.addEditForm.controls['reason'].setValue(value.reason);
        this.addEditForm.controls['remarks'].setValue(value.remarks);
        this.isUpdatetable = true;
        this.addEditForm.controls['schoolYear'].disable();
        this.addEditForm.controls['semester'].disable();
        this.validateExist(value.studentSrCode);
        this.loadLocations(value.studentReqTypeID);

    }
    loadSchoolYears() {
        this.schoolyearService.getAll().subscribe((data) => {
            this.schoolYears = data;
        }, error => console.error(error)
        );
    }
    loadLocations(studentReqID: number) {
        this.locationService.getAll(studentReqID).subscribe((data) => {
            this.locations = data;
        }, error => console.log(error));
    }
    loadStudentReqTypes() {
        this.studentReqTypeService.getAll('').subscribe((data) => {
            this.studentReqTypes = data;
        }, error => console.log(error));
    }

    validateExist(srCode: string) {
        this.isExists = false;
        this.studentService.getStudent(srCode).subscribe((data) => {
            if (data.studentID !== 0) {
                this.fullName = data.fullName;
                this.isExists = true;
                this.studentID = data.studentID;
            }
        }, error => console.log(error));
    }
    cancel() {
        this.show_read_all_student_request_event.emit({ title: '' });
    }

}
