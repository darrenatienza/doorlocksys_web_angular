import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IctInventoryComponent } from './ict-inventory.component';

describe('IctInventoryComponent', () => {
  let component: IctInventoryComponent;
  let fixture: ComponentFixture<IctInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IctInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IctInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
