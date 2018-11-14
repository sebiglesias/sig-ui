import {Injectable} from '@angular/core';
import {PurchaseOrder} from '../models/purchase-order';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PurchaseOrderService {

  purchaseUrl = environment.dataBaseUrl + '/Order';
  constructor(private http: HttpClient) {}

  createNewPurchase(): Observable<PurchaseOrder> {
    return this.http.put<PurchaseOrder>(this.purchaseUrl, {});
  }

  getPurchases(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(this.purchaseUrl);
  }

  getPurchaseById(purchaseId: string): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(this.purchaseUrl + '/' + purchaseId);
  }

  updatePurchase(purchaseToUpdate: PurchaseOrder): Observable<boolean> {
    return this.http.post<boolean>(this.purchaseUrl, purchaseToUpdate);
  }

  deletePurchase(purchase: PurchaseOrder): Observable<boolean> {
    return this.http.delete<boolean>(this.purchaseUrl + '/' + purchase.id);
  }
}
