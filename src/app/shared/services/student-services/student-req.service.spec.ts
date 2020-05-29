import { TestBed } from '@angular/core/testing';

import { StudentReqService } from './student-req.service';

describe('StudentReqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentReqService = TestBed.get(StudentReqService);
    expect(service).toBeTruthy();
  });
});
