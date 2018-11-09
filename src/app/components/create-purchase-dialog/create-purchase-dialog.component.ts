import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {PurchaseOrderService} from '../../services/purchase-order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-purchase-dialog',
  templateUrl: './create-purchase-dialog.component.html',
  styleUrls: ['./create-purchase-dialog.component.css']
})
export class CreatePurchaseDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreatePurchaseDialogComponent>,
              private alertRef: MatSnackBar,
              private purchaseService: PurchaseOrderService,
              private router: Router) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  createPurchase() {
    this.purchaseService.createNewPurchase().subscribe( x => {
      this.close();
      this.onRefresh();
    });
  }

  alertMessage(msg: string) {
    this.alertRef.open(msg);
  }

  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    const currentUrl = this.router.url + '?';

    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]).then(y => this.alertMessage('Se creó el pedido'));
      });
  }
}
