import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Order} from '../../../models/order';
import {OrderService} from '../../../services/order.service';
import * as $ from 'jquery';
import {spanishJson} from '../../../models/spanishJson';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  orders: Order[];
  dataTable: any;

  constructor(private router: Router, private orderService: OrderService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.orderService.getAllOrders()
      .subscribe( data => {
        this.orders = data;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable({
          'language': {
            'url': spanishJson
          }
        });
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
