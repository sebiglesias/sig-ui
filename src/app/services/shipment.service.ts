import { Injectable } from '@angular/core';
import {Shipment} from '../models/shipment';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ShipmentService {

  shipments: Shipment[] = [];
  lastId = 0;

  constructor() {
    this.shipments = JSON.parse(localStorage.getItem('shipments'));
    this.lastId = Number(localStorage.getItem('shipmentLastId'));
    if (this.shipments === null || this.shipments === undefined) {
      this.shipments = [];
    }
    if (this.lastId === null || this.lastId === undefined) {
      this.lastId = 0;
    }
  }

  createShipment(shipment: Shipment): Observable<Shipment> {
    if (!shipment.id) {
      shipment.id = ++this.lastId;
      localStorage.setItem('shipmentLastId', String(this.lastId));
    }
    this.shipments.push(shipment);
    localStorage.setItem('shipments', JSON.stringify(this.shipments));
    return of(shipment);
  }

  getAllShipments(): Observable<Shipment[]> {
    return of(this.shipments);
  }

  getShipmentById(shipmentId: number): Observable<Shipment> {
    if (this.shipments.length === 0) {
      return of();
    } else {
      let shipmentToReturn;
      this.shipments.map(shipment => {
        if (shipment.id === shipmentId) {
          shipmentToReturn = of(shipment);
        }
      });
      return shipmentToReturn;
    }
  }

  updateShipment(shipmentToUpdate: Shipment): Observable<Boolean> {
    const index = this.shipments.findIndex(shipment => shipment.id === Number(shipmentToUpdate.id));
    if (index === -1) { return of(false); }
    this.shipments[index] = shipmentToUpdate;
    localStorage.setItem('shipments', JSON.stringify(this.shipments));
    return of(true);
  }
}
