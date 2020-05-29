import { SgPanelModule } from './sg-panel/sg-panel.module';

describe('SgPanelModule', () => {
  let sgPanelModule: SgPanelModule;

  beforeEach(() => {
    sgPanelModule = new SgPanelModule();
  });

  it('should create an instance', () => {
    expect(sgPanelModule).toBeTruthy();
  });
});
