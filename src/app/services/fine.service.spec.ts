import { TestBed, inject } from '@angular/core/testing';

import { FineService } from './fine.service';

describe('FineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FineService]
    });
  });

  it('should be created', inject([FineService], (service: FineService) => {
    expect(service).toBeTruthy();
  }));
});
