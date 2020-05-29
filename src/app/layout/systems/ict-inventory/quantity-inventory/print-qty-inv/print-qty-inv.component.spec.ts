import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintQtyInvComponent } from './print-qty-inv.component';

describe('PrintQtyInvComponent', () => {
  let component: PrintQtyInvComponent;
  let fixture: ComponentFixture<PrintQtyInvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintQtyInvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintQtyInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
