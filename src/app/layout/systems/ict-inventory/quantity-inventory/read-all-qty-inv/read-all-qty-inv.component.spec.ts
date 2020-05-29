import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAllQtyInvComponent } from './read-all-qty-inv.component';

describe('ReadAllQuantityInventoryComponent', () => {
  let component: ReadAllQtyInvComponent;
  let fixture: ComponentFixture<ReadAllQtyInvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadAllQtyInvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAllQtyInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
