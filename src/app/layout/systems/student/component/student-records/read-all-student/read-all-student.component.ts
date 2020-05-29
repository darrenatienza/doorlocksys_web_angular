import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { StudentService } from '../../../../../../shared/services/person/student.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
    selector: 'app-read-all-student',
    templateUrl: './read-all-student.component.html',
    styleUrls: ['./read-all-student.component.scss']
})
export class ReadAllStudentComponent implements OnInit {

    @Output() show_add_new_student_event = new EventEmitter();
    @Output() show_edit_student_event = new EventEmitter();
    @Output() show_main_menu_event = new EventEmitter();
    @ViewChild('showDeleteQuestion', {static: false}) private showDeleteQuestion: SwalComponent;
    @ViewChild('showRecordDeleted', {static: false}) private showRecordDeleted: SwalComponent;
    studentID = 0;
    records = [];
    criteria = '';
    constructor(private studentService: StudentService) { }

    ngOnInit() {
        this.readAllStudent();
    }

    addNewStudent() {
        this.show_add_new_student_event.emit({
            title: 'Add New Student'
        });
    }
    editStudent(id) {
        this.show_edit_student_event.emit({
            title: 'Edit Student',
            studentID: id
        });
    }
    readAllStudent() {
        this.studentService.getAll(this.criteria).subscribe((data) => {
            this.records = data;
        }, error => console.log(error));
    }
    showMainMenu() {
        this.show_main_menu_event.emit({
            title: ''
        });
    }
    search() {
        this.readAllStudent();
    }
    deleteReport() {
        this.studentService.delete(this.studentID).subscribe(data => {
            if (data) {
                this.readAllStudent();
                this.showRecordDeleted.show();
            }

        });
    }
    showDeleteAlert(id) {
        this.studentID = id;
        this.showDeleteQuestion.show();
    }
}
