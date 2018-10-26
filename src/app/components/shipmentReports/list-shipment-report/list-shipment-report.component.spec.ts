import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShipmentReportComponent } from './list-shipment-report.component';

describe('ListShipmentReportComponent', () => {
  let component: ListShipmentReportComponent;
  let fixture: ComponentFixture<ListShipmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListShipmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListShipmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
