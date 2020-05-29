import { IctInventoryModule } from './ict-inventory.module';

describe('IctInventoryModule', () => {
  let ictInventoryModule: IctInventoryModule;

  beforeEach(() => {
    ictInventoryModule = new IctInventoryModule();
  });

  it('should create an instance', () => {
    expect(ictInventoryModule).toBeTruthy();
  });
});
