import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Shipment} from '../../../models/shipment';
import {ShipmentReport} from '../../../models/shipment-report';
import {ShipmentReportService} from '../../../services/shipment-report.service';

@Component({
  selector: 'app-list-shipment-report',
  templateUrl: './list-shipment-report.component.html',
  styleUrls: ['./list-shipment-report.component.css']
})
export class ListShipmentReportComponent implements OnInit {

  shipmentReports: ShipmentReport[];

  constructor(private router: Router, private shipmentReportService: ShipmentReportService) { }

  ngOnInit() {
    this.shipmentReportService.getAllShipmentReports()
      .subscribe( data => {
        this.shipmentReports = data;
      });
  }

  editShipmentReport(shipment: ShipmentReport): void {
    localStorage.removeItem('editShipmentReportId');
    localStorage.setItem('editShipmentReportId', shipment.id.toString());
    this.router.navigate(['edit-shipment-report']);
  }

  addShipmentReport(): void {
    this.router.navigate(['add-shipment-report']);
  }
}
