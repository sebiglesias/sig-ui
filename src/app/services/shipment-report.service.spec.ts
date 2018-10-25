import { TestBed, inject } from '@angular/core/testing';

import { ShipmentReportService } from './shipment-report.service';

describe('ShipmentReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShipmentReportService]
    });
  });

  it('should be created', inject([ShipmentReportService], (service: ShipmentReportService) => {
    expect(service).toBeTruthy();
  }));
});
