import { TestBed } from '@angular/core/testing';

import { ManagePromotionsService } from './manage-promotions.service';

describe('ManagePromotionsService', () => {
  let service: ManagePromotionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagePromotionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
