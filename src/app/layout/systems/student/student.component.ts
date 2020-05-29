import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss'],
    animations: [routerTransition()]
})
export class StudentComponent implements OnInit {

    title = '';
    show_main_menu_html = true;
    show_read_all_student_html = false;
    show_add_new_student_html = false;
    show_edit_student_html = false;

    show_read_all_student_request_html = false;
    show_add_new_student_request_html = false;
    show_edit_student_request_html = false;
    show_add_edit_student_request_html = false;

    studentID = 0;
    studentReqID = 0;
    parentCaller = ''; // where parent request come from
    show_print_student_request_html: boolean;
    constructor() { }

    ngOnInit() {
    }

    readAllStudentRequests($event) {
        this.title = $event.title;
        this.hideAllHtml();
        this.show_read_all_student_request_html = true;

    }
    addNewStudentRequest($event) {
        this.title = $event.title;
        this.hideAllHtml();
        this.show_add_edit_student_request_html = true;
    }
    addEditStudentRequest($event) {
        this.title = $event.title;
        this.studentReqID = $event.studentReqID;
        this.hideAllHtml();
        this.show_add_edit_student_request_html = true;
    }
    editStudentRequest($event) {
        this.title = $event.title;
        this.studentReqID = $event.studentReqID;
        this.hideAllHtml();
        this.show_add_edit_student_request_html = true;
    }
    printStudentRequest($event) {
        this.title = $event.title;
        this.hideAllHtml();
        this.show_print_student_request_html = true;
    }

    readAllStudents($event) {
        this.title = $event.title;
        this.hideAllHtml();
        this.show_read_all_student_html = true;

    }
    addNewStudent($event) {
        this.title = $event.title;
        this.hideAllHtml();
        this.parentCaller = $event.parentCaller;
        this.show_add_new_student_html = true;
    }
    editStudent($event) {
        this.title = $event.title;
        this.studentID = $event.studentID;
        this.hideAllHtml();
        this.show_edit_student_html = true;
    }
    showMainMenu($event) {
        // set title and product ID
        this.title = $event.title;

        // hide all html then show only one html
        this.hideAllHtml();
        this.show_main_menu_html = true;
    }
    hideAllHtml() {
        this.show_add_new_student_html = false;
        this.show_read_all_student_html = false;
        this.show_edit_student_html = false;
        this.show_main_menu_html = false;

        this.show_read_all_student_request_html = false;
        this.show_add_new_student_request_html = false;
        this.show_edit_student_request_html = false;
        this.show_add_edit_student_request_html = false;
        this.show_print_student_request_html = false;
    }


}
