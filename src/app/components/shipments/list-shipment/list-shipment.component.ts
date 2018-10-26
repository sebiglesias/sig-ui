import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Shipment} from '../../../models/shipment';
import {ShipmentService} from '../../../services/shipment.service';

@Component({
  selector: 'app-list-shipment',
  templateUrl: './list-shipment.component.html',
  styleUrls: ['./list-shipment.component.css']
})
export class ListShipmentComponent implements OnInit {

  shipments: Shipment[];

  constructor(private router: Router, private shipmentService: ShipmentService) { }

  ngOnInit() {
    this.shipmentService.getAllShipments()
      .subscribe( data => {
        this.shipments = data;
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
