import { TestBed } from '@angular/core/testing';

import { HttpConfigInterceptorService } from './httpConfig.interceptor.service';

describe('HandleRequestInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpConfigInterceptorService = TestBed.get(HttpConfigInterceptorService);
    expect(service).toBeTruthy();
  });
});
