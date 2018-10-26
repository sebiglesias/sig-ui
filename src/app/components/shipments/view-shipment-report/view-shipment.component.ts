import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Shipment} from '../../../models/shipment';
import {ShipmentService} from '../../../services/shipment.service';

@Component({
  selector: 'app-view-shipment',
  templateUrl: './view-shipment.component.html',
  styleUrls: ['./view-shipment.component.css']
})
export class ViewShipmentComponent implements OnInit {

  shipment: Shipment;
  constructor(private route: ActivatedRoute, private shipmentService: ShipmentService) {
    this.route.params.subscribe( params => {
      this.shipmentService.getShipmentById(params['id']).subscribe( sR => this.shipment = sR);
    });
  }

  ngOnInit() { }

}
