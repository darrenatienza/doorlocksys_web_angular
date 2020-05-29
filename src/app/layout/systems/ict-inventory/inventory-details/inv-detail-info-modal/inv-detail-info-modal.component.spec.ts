import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvDetailInfoModalComponent } from './inv-detail-info-modal.component';

describe('InvDetailInfoModalComponent', () => {
  let component: InvDetailInfoModalComponent;
  let fixture: ComponentFixture<InvDetailInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvDetailInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvDetailInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
