import { Injectable } from '@angular/core';
import {Truck} from '../models/truck';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {dataBaseUrl} from '../../environments/environment';

@Injectable()
export class TruckService {

  trucks: Truck[] = [];
  truckUrl = dataBaseUrl + '/Truck';

  constructor(private http: HttpClient) { }

  createTruck(truck: Truck): Observable<Truck> {
    return this.http.post<Truck>(this.truckUrl, truck);
  }

  getAllTrucks(): Observable<Truck[]> {
    return this.http.get<Truck[]>(this.truckUrl);
  }

  getTruckById(truckId: string): Observable<Truck> {
    return this.http.get<Truck>(this.truckUrl + '/' + String(truckId));
  }

  updateTruck(truckToUpdate: Truck): Observable<Truck> {
    return this.http.put<Truck>(this.truckUrl, truckToUpdate);
  }
}
