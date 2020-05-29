import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQuantityInventoryComponent } from './add-edit-quantity-inventory.component';

describe('AddEditQuantityInventoryComponent', () => {
  let component: AddEditQuantityInventoryComponent;
  let fixture: ComponentFixture<AddEditQuantityInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditQuantityInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditQuantityInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
