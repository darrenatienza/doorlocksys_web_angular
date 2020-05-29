import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysStatComponent } from './sys-stat.component';

describe('SysStatComponent', () => {
  let component: SysStatComponent;
  let fixture: ComponentFixture<SysStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
