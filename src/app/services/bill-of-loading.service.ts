import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {BillOfLoading} from '../models/bill-of-loading';

@Injectable()
export class BillOfLoadingService {

  billOfLoadings: BillOfLoading[] = [];
  lastId = 0;

  constructor() {
    this.billOfLoadings = JSON.parse(localStorage.getItem('billOfLoadings'));
    this.lastId = Number(localStorage.getItem('billOfLoadingLastId'));
    if (this.billOfLoadings === null || this.billOfLoadings === undefined) {
      this.billOfLoadings = [];
    }
    if (this.lastId === null || this.lastId === undefined) {
      this.lastId = 0;
    }
  }

  createBillOfLoading(billOfLoading: BillOfLoading): Observable<BillOfLoading> {
    if (!billOfLoading.id) {
      billOfLoading.id = ++this.lastId;
    }
    this.billOfLoadings.push(billOfLoading);
    localStorage.setItem('billOfLoadings', JSON.stringify(this.billOfLoadings));
    return of(billOfLoading);
  }

  getAllBillOfLoadings(): Observable<BillOfLoading[]> {
    return of(this.billOfLoadings);
  }

  getBillOfLoadingById(truckId: string): Observable<BillOfLoading> {
    if (this.billOfLoadings.length === 0) {
      return of();
    } else {
      let truckToReturn;
      this.billOfLoadings.forEach(truck => {
        if (truck.id === Number(truckId)) {
          truckToReturn = of(truck);
        }
      });
      return truckToReturn;
    }
  }

  updateBillOfLoading(truckToUpdate: BillOfLoading): Observable<Boolean> {
    const index = this.billOfLoadings.findIndex(shipment => shipment.id === Number(truckToUpdate.id));
    if (index === -1) { return of(false); }
    this.billOfLoadings[index] = truckToUpdate;
    localStorage.setItem('billOfLoadings', JSON.stringify(this.billOfLoadings));
    return of(true);
  }
}
