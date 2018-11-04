import { Injectable } from '@angular/core';
import {Truck} from '../models/truck';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {dataBaseUrl} from '../../environments/environment';
import {ContainerService} from './container.service';
import {Router} from '@angular/router';
import {Container} from '../models/container';

@Injectable()
export class TruckService {

  truckUrl = dataBaseUrl + '/Truck';

  constructor(private http: HttpClient, private containerService: ContainerService, private router: Router) { }

  createTruck(truck: TruckToUpdate, container: Container) {
    truck.container = null;
    this.http.put<Truck>(this.truckUrl, truck).subscribe( t => {
      this.updateTruck(t, container).subscribe(x => this.router.navigate(['list-truck']));
    });
  }

  getAllTrucks(): Observable<Truck[]> {
    return this.http.get<Truck[]>(this.truckUrl);
  }

  getTruckById(truckId: string): Observable<Truck> {
    return this.http.get<Truck>(this.truckUrl + '/' + String(truckId));
  }

  updateTruck(truckToUpdate: Truck, container: Container): Observable<Truck> {
    truckToUpdate.container = container;
    return this.http.post<Truck>(this.truckUrl, truckToUpdate);
  }
}

class TruckToUpdate {
  id: number;
  container: number;
  driver: string;
  licensePlate: string;
}
