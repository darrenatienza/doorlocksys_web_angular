import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAllStudentComponent } from './read-all-student.component';

describe('ReadAllStudentComponent', () => {
  let component: ReadAllStudentComponent;
  let fixture: ComponentFixture<ReadAllStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadAllStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAllStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
