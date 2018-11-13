import {Component, Input, OnInit} from '@angular/core';
import {PurchaseOrder} from '../../models/purchase-order';
import {ActivatedRoute} from '@angular/router';
import {PurchaseOrderService} from '../../services/purchase-order.service';
import {StepperService} from '../../services/stepper.service';

@Component({
  selector: 'app-purchase-view',
  templateUrl: './purchase-view.component.html',
  styleUrls: ['./purchase-view.component.css']
})
export class PurchaseViewComponent implements OnInit {

  purchase: PurchaseOrder;
  info: boolean;
  constructor(private route: ActivatedRoute, private purchaseService: PurchaseOrderService, private stepper: StepperService) { }

  getStepNumber(purchaseOrder: PurchaseOrder): number {
    return this.stepper.getStepNumber(purchaseOrder);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.purchaseService.getPurchaseById(params['id']).subscribe( p => this.purchase = p);
    });
    this.info = true;
  }

  changeInfo() {
    this.info = !this.info;
  }
}
