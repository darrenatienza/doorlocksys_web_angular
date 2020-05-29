import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAllInvRecComponent } from './read-all-inv-rec.component';

describe('ReadAllInvRecComponent', () => {
  let component: ReadAllInvRecComponent;
  let fixture: ComponentFixture<ReadAllInvRecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadAllInvRecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAllInvRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
