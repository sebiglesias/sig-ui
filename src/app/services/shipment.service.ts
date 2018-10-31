import { Injectable } from '@angular/core';
import {Shipment} from '../models/shipment';
import {Observable} from 'rxjs/Observable';
import {dataBaseUrl} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ShipmentService {

  shipmentUrl = dataBaseUrl + '/Shipment';

  constructor(private http: HttpClient) { }

  createShipment(shipment: Shipment): Observable<Shipment> {
    return this.http.post<Shipment>(this.shipmentUrl, shipment);
  }

  getAllShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.shipmentUrl);
  }

  getShipmentById(shipmentId: number): Observable<Shipment> {
    return this.http.get<Shipment>(this.shipmentUrl + '/' + String(shipmentId));
  }

  updateShipment(shipmentToUpdate: Shipment): Observable<Shipment> {
    return this.http.put<Shipment>(this.shipmentUrl, shipmentToUpdate);
  }
}
