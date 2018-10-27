import { Injectable } from '@angular/core';
import {Truck} from '../models/truck';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class TruckService {

  trucks: Truck[] = [];
  lastId = 0;

  constructor() {
    this.trucks = JSON.parse(localStorage.getItem('trucks'));
    this.lastId = Number(localStorage.getItem('truckLastId'));
    if (this.trucks === null || this.trucks === undefined) {
      this.trucks = [];
    }
    if (this.lastId === null || this.lastId === undefined) {
      this.lastId = 0;
    }
  }

  createTruck(truck: Truck): Observable<Truck> {
    if (!truck.id) {
      truck.id = ++this.lastId;
      localStorage.setItem('truckLastId', JSON.stringify(this.lastId));
    }
    this.trucks.push(truck);
    localStorage.setItem('trucks', JSON.stringify(this.trucks));
    return of(truck);
  }

  getAllTrucks(): Observable<Truck[]> {
    return of(this.trucks);
  }

  getTruckById(truckId: string): Observable<Truck> {
    if (this.trucks.length === 0) {
      return of();
    } else {
      let truckToReturn;
      this.trucks.forEach(truck => {
        if (truck.id === Number(truckId)) {
          truckToReturn = of(truck);
        }
      });
      return truckToReturn;
    }
  }

  updateTruck(truckToUpdate: Truck): Observable<Boolean> {
    const index = this.trucks.findIndex(shipment => shipment.id === Number(truckToUpdate.id));
    if (index === -1) { return of(false); }
    this.trucks[index] = truckToUpdate;
    localStorage.setItem('trucks', JSON.stringify(this.trucks));
    return of(true);
  }
}
