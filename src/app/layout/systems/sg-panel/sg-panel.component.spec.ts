import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SgPanelComponent } from './sg-panel.component';

describe('SgPanelComponent', () => {
  let component: SgPanelComponent;
  let fixture: ComponentFixture<SgPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SgPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SgPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
