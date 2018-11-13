import {Component, OnInit} from '@angular/core';
import {PurchaseOrder} from '../../models/purchase-order';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CreatePurchaseDialogComponent} from '../create-purchase-dialog/create-purchase-dialog.component';
import {PurchaseOrderService} from '../../services/purchase-order.service';
import {Router} from '@angular/router';
import {StepperService} from '../../services/stepper.service';

@Component({
  selector: 'app-purchase-orders-list',
  templateUrl: './purchase-orders-list.component.html',
  styleUrls: ['./purchase-orders-list.component.css']
})
export class PurchaseOrdersListComponent implements OnInit {

  purchaseOrders: PurchaseOrder[];

  constructor(public dialog: MatDialog,
              private router: Router,
              private purchaseService: PurchaseOrderService,
              private stepper: StepperService) {
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

  goToView(purchase: PurchaseOrder) {
    this.router.navigate(['ordenes/' + purchase.id]);
  }

  getStepNumber(purchaseOrder: PurchaseOrder) {
    return this.stepper.getStepNumber(purchaseOrder);
  }
}
