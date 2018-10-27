import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ShipmentReport} from '../models/shipment-report';

@Injectable()
export class ShipmentReportService {

  shipmentReports: ShipmentReport[] = [];
  lastId = 0;

  constructor() {
    this.shipmentReports = JSON.parse(localStorage.getItem('shipmentReports'));
    this.lastId = Number(localStorage.getItem('shipmentReportLastId'));
    if (this.shipmentReports === null || this.shipmentReports === undefined) {
      this.shipmentReports = [];
    }
    if (this.lastId === null || this.lastId === undefined) {
      this.lastId = 0;
    }
  }

  createShipmentReport(shipment: ShipmentReport): Observable<ShipmentReport> {
    if (!shipment.id) {
      shipment.id = ++this.lastId;
      localStorage.setItem('shipmentReportLastId', JSON.stringify(this.lastId));

    }
    this.shipmentReports.push(shipment);
    localStorage.setItem('shipmentReports', JSON.stringify(this.shipmentReports));
    return of(shipment);
  }

  getAllShipmentReports(): Observable<ShipmentReport[]> {
    return of(this.shipmentReports);
  }

  getShipmentReportById(shipmentId: number): Observable<ShipmentReport> {
    if (this.shipmentReports.length === 0) {
      return of();
    } else {
      let shipmentToReturn;
      this.shipmentReports.map(shipment => {
        if (shipment.id === shipmentId) {
          shipmentToReturn = of(shipment);
        }
      });
      return shipmentToReturn;
    }
  }

  updateShipmentReport(shipmentToUpdate: ShipmentReport): Observable<Boolean> {
    const index = this.shipmentReports.findIndex(shipment => shipment.id === Number(shipmentToUpdate.id));
    if (index === -1) { return of(false); }
    this.shipmentReports[index] = shipmentToUpdate;
    localStorage.setItem('shipmentReports', JSON.stringify(this.shipmentReports));
    return of(true);
  }
}
