import {Component, Input, OnInit} from '@angular/core';
import {PurchaseOrder} from '../../models/purchase-order';
import {StepperService} from '../../services/stepper.service';

@Component({
  selector: 'app-purchase-info',
  templateUrl: './purchase-info.component.html',
  styleUrls: ['./purchase-info.component.css']
})
export class PurchaseInfoComponent implements OnInit {

  @Input() purchase: PurchaseOrder;

  constructor(private stepper: StepperService) { }

  ngOnInit() {
  }

  getStepNumber(purchaseOrder: PurchaseOrder) {
    return this.stepper.getStepNumber(purchaseOrder);
  }

}
