import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShipmentReportComponent } from './add-shipment-report.component';

describe('AddShipmentReportComponent', () => {
  let component: AddShipmentReportComponent;
  let fixture: ComponentFixture<AddShipmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShipmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShipmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
