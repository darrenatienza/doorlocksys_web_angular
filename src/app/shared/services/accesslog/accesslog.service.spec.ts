import { TestBed } from '@angular/core/testing';

import { AccesslogService } from './accesslog.service';

describe('AccesslogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccesslogService = TestBed.get(AccesslogService);
    expect(service).toBeTruthy();
  });
});
