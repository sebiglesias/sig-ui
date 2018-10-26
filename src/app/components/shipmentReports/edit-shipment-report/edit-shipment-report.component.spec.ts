import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShipmentReportComponent } from './edit-shipment-report.component';

describe('EditShipmentReportComponent', () => {
  let component: EditShipmentReportComponent;
  let fixture: ComponentFixture<EditShipmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShipmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShipmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
