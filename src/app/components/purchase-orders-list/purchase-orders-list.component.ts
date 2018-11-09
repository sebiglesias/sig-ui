import {Component, OnInit} from '@angular/core';
import {PurchaseOrder} from '../../models/purchase-order';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CreatePurchaseDialogComponent} from '../create-purchase-dialog/create-purchase-dialog.component';
import {PurchaseOrderService} from '../../services/purchase-order.service';

@Component({
  selector: 'app-purchase-orders-list',
  templateUrl: './purchase-orders-list.component.html',
  styleUrls: ['./purchase-orders-list.component.css']
})
export class PurchaseOrdersListComponent implements OnInit {

  purchaseOrders: PurchaseOrder[];

  getStepNumber(purchaseOrder: PurchaseOrder) {
    if (purchaseOrder.date === undefined) {
      return 0;
    } else if (purchaseOrder.delivery === undefined) {
      return 1;
    } else if (purchaseOrder.delivery.arrivalToPlant === undefined) {
      return 2;
    } else if (purchaseOrder.delivery.containerDischargeEnd === undefined) {
      return 3;
    } else if (purchaseOrder.delivery.blockDischargeEnd === undefined) {
      return 4;
    } else if (purchaseOrder.delivery.damageFine === undefined) {
      return 5;
    } else if (purchaseOrder.delivery.lateReturnFine === undefined) {
      return 6;
    } else {
      return 7;
    }
  }

  constructor(public dialog: MatDialog, private purchaseService: PurchaseOrderService) {
    this.purchaseService.getPurchases().subscribe( list => this.purchaseOrders = list);
  }

  ngOnInit() {
  }

  createNewProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '140px';
    dialogConfig.width = '450px';
    const dialogRef = this.dialog.open(CreatePurchaseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
