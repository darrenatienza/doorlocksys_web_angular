import { TestBed } from '@angular/core/testing';

import { InvDetailService } from './inv-detail.service';

describe('InvDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvDetailService = TestBed.get(InvDetailService);
    expect(service).toBeTruthy();
  });
});
