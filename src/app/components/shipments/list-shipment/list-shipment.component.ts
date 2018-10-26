import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Shipment} from '../../../models/shipment';
import {ShipmentService} from '../../../services/shipment.service';
import * as $ from 'jquery';
import {spanishJson} from '../../../models/spanishJson';

@Component({
  selector: 'app-list-shipment',
  templateUrl: './list-shipment.component.html',
  styleUrls: ['./list-shipment.component.css']
})
export class ListShipmentComponent implements OnInit {

  shipments: Shipment[];
  dataTable: any;

  constructor(private router: Router, private shipmentService: ShipmentService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.shipmentService.getAllShipments()
      .subscribe( data => {
        this.shipments = data;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable({
          'language': {
            'url': spanishJson
          }
        });
      });
  }

  editShipment(shipment: Shipment): void {
    localStorage.removeItem('editShipmentId');
    localStorage.setItem('editShipmentId', shipment.id.toString());
    this.router.navigate(['edit-shipment']);
  }

  addShipment(): void {
    this.router.navigate(['add-shipment']);
  }
}
