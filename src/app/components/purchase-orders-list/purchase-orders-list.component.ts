import {Component, OnInit} from '@angular/core';
import {PurchaseOrder} from '../../models/purchase-order';

@Component({
  selector: 'app-purchase-orders-list',
  templateUrl: './purchase-orders-list.component.html',
  styleUrls: ['./purchase-orders-list.component.css']
})
export class PurchaseOrdersListComponent implements OnInit {

  purchaseOrders: PurchaseOrder[] = [{
    id: '1',
    products: [{id: 1, product: {id: 1, name: 'Marmol'}, quantityInTons: 20}],
    provider: {id: 1, name: 'Marmol SA'},
    deliveries: [],
    date: 0
  }];
  displayedColumns = ['id', 'date', 'progress'];
  constructor() {
  }

  ngOnInit() {
  }

}
