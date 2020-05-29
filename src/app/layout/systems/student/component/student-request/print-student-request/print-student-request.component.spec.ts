import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintStudentRequestComponent } from './print-student-request.component';

describe('PrintStudentRequestComponent', () => {
  let component: PrintStudentRequestComponent;
  let fixture: ComponentFixture<PrintStudentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintStudentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintStudentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
