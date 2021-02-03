import { TestBed } from '@angular/core/testing';

import { RoutingParamsService } from './routing-params.service';

describe('RoutingParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutingParamsService = TestBed.get(RoutingParamsService);
    expect(service).toBeTruthy();
  });
});
