import { TestBed } from '@angular/core/testing';

import { UiUtilsService } from './ui-utils.service';

describe('UiUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UiUtilsService = TestBed.get(UiUtilsService);
    expect(service).toBeTruthy();
  });
});
