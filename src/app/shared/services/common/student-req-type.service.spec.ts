import { TestBed } from '@angular/core/testing';

import { StudentReqTypeService } from './student-req-type.service';

describe('StudentReqTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentReqTypeService = TestBed.get(StudentReqTypeService);
    expect(service).toBeTruthy();
  });
});
