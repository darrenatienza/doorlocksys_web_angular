import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { StudentReqService } from '../../../../../../shared';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
    selector: 'app-read-all-student-request',
    templateUrl: './read-all-student-request.component.html',
    styleUrls: ['./read-all-student-request.component.scss']
})
export class ReadAllStudentRequestComponent implements OnInit {
    @Output() show_add_new_student_request_event = new EventEmitter();
    @Output() show_add_edit_student_request_event = new EventEmitter();
    @Output() show_edit_student_request_event = new EventEmitter();
    @Output() show_print_student_request_event = new EventEmitter();
    @Output() show_main_menu_event = new EventEmitter();
    studentReqID: any;
    constructor(private studentReqService: StudentReqService) { }
    records = [];
    criteria = '';
    @ViewChild('showDeleteQuestion', {static: false}) private showDeleteQuestion: SwalComponent;
    @ViewChild('showRecordDeleted', {static: false}) private showRecordDeleted: SwalComponent;
    ngOnInit() {
        this.loadStudentReqs('');
    }
    changePrintReadyStatus(id, currStat) {
        this.studentReqService.changePrintReadyStatus(id, !currStat).subscribe({
            next: value =>  console.log(value),
            error: error => console.log(error),
            complete: () => { this.loadStudentReqs(this.criteria);
                console.log('Command Completed!'); }
        });
    }
    search() {
        this.loadStudentReqs(this.criteria);
    }
    print() {
        this.show_print_student_request_event.emit({
            title: ''
        });
    }
    loadStudentReqs(criteria: string) {
        this.studentReqService.getAll(criteria).subscribe({
            next: value => this.records = value,
            error: error => console.log(error),
            complete: () => { console.log('Command Completed!'); }
        });
    }
    addNewStudentRequest() {
        this.show_add_edit_student_request_event.emit({
            title: '',
            studentReqID: 0
        });
    }
    editStudentRequest(id) {
        this.show_add_edit_student_request_event.emit({
            title: '',
            studentReqID: id
        });
    }
    showMainMenu() {
        this.show_main_menu_event.emit({
            title: ''
        });
    }
    deleteRecord() {
        this.studentReqService.delete(this.studentReqID).subscribe(data => {
            if (data) {
                this.loadStudentReqs(this.criteria);
                this.showRecordDeleted.show();
            }

        });
    }
    showDeleteAlert(id) {
        this.studentReqID = id;
        this.showDeleteQuestion.show();
    }
}
