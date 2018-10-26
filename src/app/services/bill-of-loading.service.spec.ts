import { TestBed, inject } from '@angular/core/testing';

import { BillOfLoadingService } from './bill-of-loading.service';

describe('BillOfLoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillOfLoadingService]
    });
  });

  it('should be created', inject([BillOfLoadingService], (service: BillOfLoadingService) => {
    expect(service).toBeTruthy();
  }));
});
