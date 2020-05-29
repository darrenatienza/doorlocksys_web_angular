import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInvDetailComponent } from './add-edit-inv-detail.component';

describe('AddEditInvDetailComponent', () => {
  let component: AddEditInvDetailComponent;
  let fixture: ComponentFixture<AddEditInvDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditInvDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditInvDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
