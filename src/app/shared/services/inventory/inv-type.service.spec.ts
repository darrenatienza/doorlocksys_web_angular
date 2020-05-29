import { TestBed } from '@angular/core/testing';

import { InvTypeService } from './inv-type.service';

describe('InvTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvTypeService = TestBed.get(InvTypeService);
    expect(service).toBeTruthy();
  });
});
