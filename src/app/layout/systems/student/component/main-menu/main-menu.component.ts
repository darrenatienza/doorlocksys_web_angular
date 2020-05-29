import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudentService } from '../../../../../shared/services/person/student.service';
import { count } from 'rxjs/operators';
import { StudentReqService } from '../../../../../shared';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  @Output() show_read_all_student_event = new EventEmitter();
  @Output() show_read_all_student_request_event = new EventEmitter();
  constructor(private studentService: StudentService, private studentReqService: StudentReqService) { }
  count = 0;
  studentReqCount = 0;
  ngOnInit() {
    this.getStudentCount();
    this.getStudentReqCount();
  }
  getStudentCount() {
    this.studentService.getAll('').subscribe(data => {
      this.count = data.length;
    }, error => console.log(error));
  }
  getStudentReqCount() {
    this.studentReqService.getAll('').subscribe(data => {
      this.studentReqCount = data.length;
    }, error => console.log(error));
  }
  showReportList() {
    this.show_read_all_student_event.emit({
      title: ''
    });
  }
  showStudentRequestList() {
    this.show_read_all_student_request_event.emit({
      title: ''
    });
  }
}
