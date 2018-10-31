import { Injectable } from '@angular/core';
import {Order} from '../models/order';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';
import {dataBaseUrl} from '../../environments/environment';

@Injectable()
export class OrderService {

  orderUrl = dataBaseUrl + '/Order';

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.orderUrl, order);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(this.orderUrl + '/' + String(orderId));
  }

  updateOrder(orderToUpdate: Order): Observable<Order> {
    return this.http.put<Order>(this.orderUrl, orderToUpdate);
  }
}
