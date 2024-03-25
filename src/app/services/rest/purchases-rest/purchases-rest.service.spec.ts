import { TestBed } from '@angular/core/testing';

import { PurchasesRestService } from './purchases-rest.service';

describe('PurchasesRestService', () => {
  let service: PurchasesRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasesRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
