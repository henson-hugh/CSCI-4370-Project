import { TestBed } from '@angular/core/testing';

import { MovieInformationService } from './movie-information.service';

describe('MovieInformationService', () => {
  let service: MovieInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
