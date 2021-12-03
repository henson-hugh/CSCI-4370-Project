import { TestBed } from '@angular/core/testing';

import { ShowingTimeService } from './showing-time.service';

describe('ShowingTimeService', () => {
  let service: ShowingTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowingTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
