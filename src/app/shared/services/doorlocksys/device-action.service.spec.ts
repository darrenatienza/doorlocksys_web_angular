import { TestBed } from '@angular/core/testing';

import { DeviceActionService } from './device-action.service';

describe('DeviceActionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceActionService = TestBed.get(DeviceActionService);
    expect(service).toBeTruthy();
  });
});
