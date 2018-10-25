import { Injectable } from '@angular/core';
import {Order} from '../models/order';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class OrderService {

  orders: Order[] = [];

  constructor() { }

  createOrder(order: Order): Observable<Order> {
    this.orders.push(order);
    return of(order);
  }

  getAllOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  getOrderById(orderId: number): Observable<Order> {
    if (this.orders.length === 0) {
      return of();
    } else {
      this.orders.map(order => {
        if (order.id === orderId) {
          return of(order);
        }
      });
    }
  }

  updateOrder(orderToUpdate: Order): Observable<Boolean> {
    this.orders.filter(order => order.id === orderToUpdate.id).map(o => o = orderToUpdate);
    return of(true);
  }
}
