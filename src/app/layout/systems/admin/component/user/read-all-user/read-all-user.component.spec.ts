import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAllUserComponent } from './read-all-user.component';

describe('ReadAllUserComponent', () => {
  let component: ReadAllUserComponent;
  let fixture: ComponentFixture<ReadAllUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadAllUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAllUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
