import { TestBed } from '@angular/core/testing';

import { InvStatService } from './inv-stat.service';

describe('InvStatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvStatService = TestBed.get(InvStatService);
    expect(service).toBeTruthy();
  });
});
