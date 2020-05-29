import { TestBed } from '@angular/core/testing';

import { QtyInvService } from './qty-inv.service';

describe('QtyInvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QtyInvService = TestBed.get(QtyInvService);
    expect(service).toBeTruthy();
  });
});
