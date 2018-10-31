import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ShipmentReport} from '../models/shipment-report';
import {HttpClient} from '@angular/common/http';
import {dataBaseUrl} from '../../environments/environment';

@Injectable()
export class ShipmentReportService {

  shipmentReportUrl = dataBaseUrl + '/ShipmentReport';

  constructor(private http: HttpClient) { }

  createShipmentReport(shipment: ShipmentReport): Observable<ShipmentReport> {
    return this.http.post<ShipmentReport>(this.shipmentReportUrl, shipment);
  }

  getAllShipmentReports(): Observable<ShipmentReport[]> {
    return this.http.get<ShipmentReport[]>(this.shipmentReportUrl);
  }

  getShipmentReportById(shipmentId: number): Observable<ShipmentReport> {
    return this.http.get<ShipmentReport>(this.shipmentReportUrl + '/' + String(shipmentId));
  }

  updateShipmentReport(shipmentToUpdate: ShipmentReport): Observable<ShipmentReport> {
    return this.http.put<ShipmentReport>(this.shipmentReportUrl, shipmentToUpdate);
  }
}
