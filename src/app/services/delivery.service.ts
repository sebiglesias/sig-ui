import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Delivery} from '../models/delivery';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DeliveryService {

  deliveryUrl = environment.dataBaseUrl + '/Delivery';

  constructor(private http: HttpClient) {}

  createDelivery(): Observable<Delivery> {
    return this.http.put<Delivery>(this.deliveryUrl, {});
  }

  editDelivery(deliveryToUpdate: Delivery): Observable<boolean> {
    return this.http.post<boolean>(this.deliveryUrl, deliveryToUpdate);
  }

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.deliveryUrl);
  }

  getDeliveryById(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(this.deliveryUrl + '/' + String(id));
  }
}
