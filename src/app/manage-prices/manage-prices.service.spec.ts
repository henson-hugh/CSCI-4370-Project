import { TestBed } from '@angular/core/testing';

import { ManagePricesService } from './manage-prices.service';

describe('ManagePricesService', () => {
  let service: ManagePricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagePricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
