import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInvRecordListModalComponent } from './show-inv-record-list-modal.component';

describe('ShowInvRecordListModalComponent', () => {
  let component: ShowInvRecordListModalComponent;
  let fixture: ComponentFixture<ShowInvRecordListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowInvRecordListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInvRecordListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
