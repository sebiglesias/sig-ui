import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TruckService} from '../../../services/truck.service';
import {Truck} from '../../../models/truck';
import {Order} from '../../../models/order';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  orders: Order[];

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllOrders()
      .subscribe( data => {
        this.orders = data;
      });
  }

  editOrder(order: Order): void {
    localStorage.removeItem('editOrderId');
    localStorage.setItem('editOrderId', order.id.toString());
    this.router.navigate(['edit-order']);
  }

  addOrder(): void {
    this.router.navigate(['add-order']);
  }
}