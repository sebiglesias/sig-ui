import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Shipment} from '../../../models/shipment';
import {ShipmentReport} from '../../../models/shipment-report';
import {ShipmentReportService} from '../../../services/shipment-report.service';
import * as $ from 'jquery';
import {spanishJson} from '../../../models/spanishJson';

@Component({
  selector: 'app-list-shipment-report',
  templateUrl: './list-shipment-report.component.html',
  styleUrls: ['./list-shipment-report.component.css']
})
export class ListShipmentReportComponent implements OnInit {

  shipmentReports: ShipmentReport[];
  dataTable: any;

  constructor(private router: Router, private shipmentReportService: ShipmentReportService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.shipmentReportService.getAllShipmentReports()
      .subscribe( data => {
        this.shipmentReports = data;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable({
          'language': {
            'url': spanishJson
          }
        });
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
