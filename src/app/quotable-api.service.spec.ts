import { TestBed } from '@angular/core/testing';

import { QuotableApiService } from './quotable-api.service';

describe('QuotableApiService', () => {
  let service: QuotableApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotableApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
