import { Injectable } from '@angular/core';
import {PurchaseOrder} from '../models/purchase-order';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class PurchaseOrderService {

  purchaseOrders: PurchaseOrder[] = [];
  constructor() {
    this.purchaseOrders = JSON.parse(localStorage.getItem('purchaseOrders'));
  }

  createNewPurchase(): Observable<boolean> {
    const po = new PurchaseOrder(Math.random().toString());
    if (this.purchaseOrders === undefined || this.purchaseOrders === null || this.purchaseOrders.length === 0) {
      this.purchaseOrders = [po];
    } else {
      this.purchaseOrders = this.purchaseOrders.concat(po);
    }
    localStorage.setItem('purchaseOrders', JSON.stringify(this.purchaseOrders));
    return Observable.of(true);
  }

  getPurchases(): Observable<PurchaseOrder[]> {
    return Observable.of(this.purchaseOrders);
  }
}
