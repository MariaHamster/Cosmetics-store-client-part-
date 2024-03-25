import { TestBed } from '@angular/core/testing';

import { FeedbackRestService } from './feedback-rest.service';

describe('FeedbackRestService', () => {
  let service: FeedbackRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
