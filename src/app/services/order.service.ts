import { Injectable } from '@angular/core';
import {Order} from '../models/order';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {dataBaseUrl} from '../../environments/environment';
import {Product} from '../models/product';
import {Company} from '../models/company';
import {BillOfLoading} from '../models/bill-of-loading';
import {Router} from '@angular/router';

@Injectable()
export class OrderService {

  orderUrl = dataBaseUrl + '/Order';

  constructor(private http: HttpClient, private router: Router) { }

  createOrder(order: Order, product: Product, company: Company) {
    order.company = null;
    order.product = null;
    this.http.put<Order>(this.orderUrl, order).subscribe( o => {
      this.updateOrder(o, product, company).subscribe(x => this.router.navigate(['list-order']));
    });
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(this.orderUrl + '/' + String(orderId));
  }

  updateOrder(orderToUpdate: Order, product: Product, company: Company): Observable<Order> {
    orderToUpdate.product = product;
    orderToUpdate.company = company;
    const d = new Date(orderToUpdate.date);
    orderToUpdate.date = d.getTime();
    return this.http.post<Order>(this.orderUrl, orderToUpdate);
  }
}
