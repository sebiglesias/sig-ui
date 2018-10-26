import { Injectable } from '@angular/core';
import {Order} from '../models/order';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class OrderService {

  orders: Order[] = [];
  lastId = 0;

  constructor() {
    this.orders = JSON.parse(localStorage.getItem('orders'));
    this.lastId = Number(localStorage.getItem('orderLastId'));
    if (this.orders === null || this.orders === undefined) {
      this.orders = [];
    }
    if (this.lastId === null || this.lastId === undefined) {
      this.lastId = 0;
    }
  }

  createOrder(order: Order): Observable<Order> {
    if (!order.id) {
      order.id = ++this.lastId;
    }
    this.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(this.orders));
    return of(order);
  }

  getAllOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  getOrderById(orderId: number): Observable<Order> {
    if (this.orders.length === 0) {
      return of();
    } else {
      let orderToReturn;
      this.orders.map(order => {
        if (order.id === orderId) {
          orderToReturn = of(order);
        }
      });
      return orderToReturn;
    }
  }

  updateOrder(orderToUpdate: Order): Observable<Boolean> {
    this.orders.filter(order => order.id === orderToUpdate.id).map(o => o = orderToUpdate);
    localStorage.setItem('orders', JSON.stringify(this.orders));
    return of(true);
  }
}
