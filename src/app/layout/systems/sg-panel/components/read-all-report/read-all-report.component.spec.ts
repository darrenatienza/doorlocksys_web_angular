import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAllReportComponent } from './read-all-report.component';

describe('ReadAllReportComponent', () => {
  let component: ReadAllReportComponent;
  let fixture: ComponentFixture<ReadAllReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadAllReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAllReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
