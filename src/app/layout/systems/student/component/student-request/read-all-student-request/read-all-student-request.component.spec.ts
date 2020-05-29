import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAllStudentRequestComponent } from './read-all-student-request.component';

describe('ReadAllStudentRequestComponent', () => {
  let component: ReadAllStudentRequestComponent;
  let fixture: ComponentFixture<ReadAllStudentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadAllStudentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAllStudentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
