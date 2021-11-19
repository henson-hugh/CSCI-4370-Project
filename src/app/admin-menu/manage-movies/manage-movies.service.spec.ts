import { TestBed } from '@angular/core/testing';

import { ManageMoviesService } from './manage-movies.service';

describe('ManageMoviesService', () => {
  let service: ManageMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
