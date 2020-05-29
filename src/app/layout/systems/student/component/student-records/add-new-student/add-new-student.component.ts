import { StudentService } from '../../../../../../shared/services/person/student.service';

import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CollegeService, CourseService, MajorService } from '../../../../../../shared/services/common';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';


@Component({
    selector: 'app-add-new-student',
    templateUrl: './add-new-student.component.html',
    styleUrls: ['./add-new-student.component.scss']
})
export class AddNewStudentComponent implements OnInit {

    addNewForm: FormGroup;
    yearLevels = [];
    colleges = [];
    courses = [];
    majors = [];
    isExists = false;
    @Output() show_read_all_student_event = new EventEmitter();
    @Output() show_add_edit_student_request_event = new EventEmitter();
    @Input() parentCaller;
    @ViewChild('saveConfirmation', {static: false}) private saveConfirmation: SwalComponent;
    @ViewChild('isExistSrCodeConfirmation', {static: false}) private isExistSrCodeConfirmation: SwalComponent;
    constructor(formBuilder: FormBuilder, private collegeService: CollegeService,
        private courseService: CourseService,
        private majorService: MajorService,
        private studentService: StudentService) {
        this.addNewForm = formBuilder.group({
            srCode: ['', Validators.required],
            firstName: ['', Validators.required],
            middleName: ['', Validators.required],
            lastName: ['', Validators.required],
            collegeID: ['', Validators.required],
            courseID: ['', Validators.required],
            majorID: ['', Validators.required],
            yearLevel: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.loadYearLevels();
        this.loadCollege();


    }
    validateExist(srCode: string) {
        this.studentService.getAll(srCode).subscribe((data) => {
            if (data.length > 0) {

                this.isExists = true;
            } else {
                this.isExists = false;
            }
        }, error => console.log(error));
    }
    getControlValue(ctrl) {
        return this.addNewForm.controls[ctrl].value;
    }
    loadCourses(collegeID: number) {
        this.courses = [];
        this.majors = [];

        this.courseService.getAll(collegeID).subscribe((data) => {
            this.courses = data;
        }, error => console.error(error)
        );
        this.addNewForm.controls['courseID'].setValue('');
        this.addNewForm.controls['majorID'].setValue('');
    }

    loadMajors(courseID: number) {
        this.majors = [];
        this.majorService.getAll(courseID).subscribe((data) => {
            this.majors = data;
        }, error => console.error(error)
        );
        this.addNewForm.controls['majorID'].setValue('');
    }
    loadCollege() {
        this.collegeService.getAll().subscribe((data) => {
            this.colleges = data;
        }, error => console.error(error)
        );
    }
    loadYearLevels() {
        this.yearLevels.push({
            id: 1,
            description: '1st Year'
        },
            {
                id: 1,
                description: '2nd Year'
            },
            {
                id: 1,
                description: '3rd Year'
            },
            {
                id: 1,
                description: '4th Year'
            });
    }
    cancel() {
        switch (this.parentCaller) {
            case 'add_student_request':
                this.show_add_edit_student_request_event.emit({title: 'Add New Student Request', studentReqID: 0});
                break;
            default:
                    this.show_read_all_student_event.emit({ title: '' });
                break;
        }

    }
    save() {
        this.studentService.add(this.addNewForm.value).subscribe((data) => {
            this.saveConfirmation.show();
            this.cancel();
        }, error => console.log(error));
    }

}
