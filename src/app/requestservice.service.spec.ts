import { TestBed } from '@angular/core/testing';

import { RequestserviceService } from './requestservice.service';

describe('RequestserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestserviceService = TestBed.get(RequestserviceService);
    expect(service).toBeTruthy();
  });
});
