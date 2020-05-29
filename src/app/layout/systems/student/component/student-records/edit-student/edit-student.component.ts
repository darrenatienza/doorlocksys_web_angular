import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { StudentRoutingModule } from '../../../student-routing.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CollegeService, CourseService, MajorService } from '../../../../../../shared/services/common';
import { StudentService } from '../../../../../../shared/services/person/student.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
    selector: 'app-edit-student',
    templateUrl: './edit-student.component.html',
    styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

    @Input() studentID: number;
    editForm: FormGroup;
    yearLevels = [];
    colleges = [];
    courses = [];
    majors = [];
    @Output() show_read_all_student_event = new EventEmitter();
    @ViewChild('saveConfirmation', {static: false}) private saveConfirmation: SwalComponent;
    constructor(formBuilder: FormBuilder, private collegeService: CollegeService,
        private courseService: CourseService,
        private majorService: MajorService,
        private studentService: StudentService) {
        this.editForm = formBuilder.group({
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
        this.loadCollege();
        this.loadYearLevels();
        this.loadDetail();




    }
    loadDetail() {
        this.studentService.getDetails(this.studentID).subscribe(data => {
            this.editForm.patchValue({
                srCode: data.srCode,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                collegeID: data.collegeID,
                courseID: data.courseID,
                majorID: data.majorID,
                yearLevel: data.yearLevel
            });
           this.loadCourses(this.editForm.controls['collegeID'].value);
           this.loadMajors(this.editForm.controls['majorID'].value);
        }
            , error => console.log(error));
    }

    getControlValue(ctrl) {
        return this.editForm.controls[ctrl].value;
    }
    onCollegeChange(collegeID: number) {
        this.courses = [];
        this.majors = [];
        this.loadCourses(collegeID);
        this.editForm.controls['courseID'].setValue('');
        this.editForm.controls['majorID'].setValue('');
    }
    loadCourses(collegeID: number) {
        this.courseService.getAll(collegeID).subscribe((data) => {
            this.courses = data;
        }, error => console.error(error)
        );

    }
    onCourseChange(courseID: number) {
        this.majors = [];
        this.loadMajors(courseID);
        this.editForm.controls['majorID'].setValue('');
    }
    loadMajors(courseID: number) {
        this.majorService.getAll(courseID).subscribe((data) => {
            this.majors = data;
        }, error => console.error(error)
        );
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
        this.show_read_all_student_event.emit({ title: '' });
    }
    save() {
        this.studentService.edit(this.studentID, this.editForm.value).subscribe((data) => {
            this.cancel();
            this.saveConfirmation.show();
        }, error => console.log(error));
    }

}
