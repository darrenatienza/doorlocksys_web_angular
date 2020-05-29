import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StudentReqService } from '../../../../../../shared';

@Component({
  selector: 'app-print-student-request',
  templateUrl: './print-student-request.component.html',
  styleUrls: ['./print-student-request.component.scss']
})
export class PrintStudentRequestComponent implements OnInit {

  @Output() show_read_all_student_request_event = new EventEmitter();
  constructor(private studentReqService: StudentReqService) { }
  records = [];
  office = '';
  preparedByName = '';
  designation = '';
  ngOnInit() {
    this.loadReport();
    this.office = localStorage.getItem('office');
    this.preparedByName = localStorage.getItem('preparedByName');
    this.designation = localStorage.getItem('designation');
  }
  loadReport() {
    this.studentReqService.getAllByIsPrintReady(true).subscribe({
      next: value => this.records = value,
      error: error => console.log(error),
      complete: () => console.log('Completed')
    });
  }
  saveData() {
    localStorage.setItem('office', this.office);
    localStorage.setItem('preparedByName', this.preparedByName);
    localStorage.setItem('designation', this.designation);
  }
  close() {
    this.show_read_all_student_request_event.emit({ title: '' });
  }
}
