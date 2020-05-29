import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAllInvDetailsComponent } from './read-all-inv-details.component';

describe('ReadAllInvDetailsComponent', () => {
  let component: ReadAllInvDetailsComponent;
  let fixture: ComponentFixture<ReadAllInvDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadAllInvDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAllInvDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
