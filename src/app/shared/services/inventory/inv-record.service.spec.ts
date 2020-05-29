import { TestBed } from '@angular/core/testing';

import { InvRecordService } from './inv-record.service';

describe('InvRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvRecordService = TestBed.get(InvRecordService);
    expect(service).toBeTruthy();
  });
});
