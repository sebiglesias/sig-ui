import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShipmentReportComponent } from './view-shipment-report.component';

describe('ViewShipmentReportComponent', () => {
  let component: ViewShipmentReportComponent;
  let fixture: ComponentFixture<ViewShipmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewShipmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewShipmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
