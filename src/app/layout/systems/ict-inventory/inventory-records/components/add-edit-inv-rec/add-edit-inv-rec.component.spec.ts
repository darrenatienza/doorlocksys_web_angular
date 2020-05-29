import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInvRecComponent } from './add-edit-inv-rec.component';

describe('AddEditInvRecComponent', () => {
  let component: AddEditInvRecComponent;
  let fixture: ComponentFixture<AddEditInvRecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditInvRecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditInvRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
