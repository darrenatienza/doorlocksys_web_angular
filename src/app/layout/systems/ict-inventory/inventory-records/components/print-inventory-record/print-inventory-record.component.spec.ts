import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintInventoryRecordComponent } from './print-inventory-record.component';

describe('PrintInventoryRecordComponent', () => {
  let component: PrintInventoryRecordComponent;
  let fixture: ComponentFixture<PrintInventoryRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintInventoryRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintInventoryRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
