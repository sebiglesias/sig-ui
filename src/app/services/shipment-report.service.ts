import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ShipmentReport} from '../models/shipment-report';
import {HttpClient} from '@angular/common/http';
import {dataBaseUrl} from '../../environments/environment';
import {CompanyService} from './company.service';
import {Company} from '../models/company';
import {Router} from '@angular/router';

@Injectable()
export class ShipmentReportService {

  shipmentReportUrl = dataBaseUrl + '/ShipmentReport';

  constructor(private http: HttpClient, private companyService: CompanyService, private router: Router) {
  }

  createShipmentReport(shipment: ShipmentReportToUpdate, navyCompany: Company, provider: Company) {
    shipment.navyCompany = null;
    shipment.provider = null;
    this.http.put<ShipmentReport>(this.shipmentReportUrl, shipment).subscribe( ship => {
      this.updateShipmentReport(ship, navyCompany, provider).subscribe(x => this.router.navigate(['list-shipment-report']));
    });
  }

  getAllShipmentReports(): Observable<ShipmentReport[]> {
    return this.http.get<ShipmentReport[]>(this.shipmentReportUrl);
  }

  getShipmentReportById(shipmentId: number): Observable<ShipmentReport> {
    return this.http.get<ShipmentReport>(this.shipmentReportUrl + '/' + String(shipmentId));
  }

  updateShipmentReport(shipmentToUpdate: ShipmentReport, navyCompany: Company, provider: Company): Observable<ShipmentReport> {
    shipmentToUpdate.navyCompany = navyCompany;
    shipmentToUpdate.provider = provider;
    const d = new Date(shipmentToUpdate.introduced);
    shipmentToUpdate.introduced = d.getTime();
    return this.http.post<ShipmentReport>(this.shipmentReportUrl, shipmentToUpdate);
  }
}

class ShipmentReportToUpdate {
  id: number;
  introduced: number;
  terminal: string;
  port: string;
  navyCompany: number;
  provider: number;
  loadingPoint: string;
  dockingPoint: string;
  boat: string;
  deliveryPlace: string;
}
