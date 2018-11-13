import { Injectable } from '@angular/core';
import {PurchaseOrder} from '../models/purchase-order';

@Injectable()
export class StepperService {

  constructor() { }


  getStepNumber(purchaseOrder: PurchaseOrder) {
    if (!purchaseOrder) {
      return -1;
    }
    if (purchaseOrder.product === undefined || purchaseOrder.product === null) {
      return 0;
    } else if (purchaseOrder.delivery === undefined || purchaseOrder.delivery === null) {
      return 1;
    } else if (purchaseOrder.delivery.arrivalToPlant === undefined || purchaseOrder.delivery.arrivalToPlant === null) {
      return 2;
    } else if (purchaseOrder.delivery.containerDischargeEnd === undefined || purchaseOrder.delivery.containerDischargeEnd === null) {
      return 3;
    } else if (purchaseOrder.delivery.blockDischargeEnd === undefined || purchaseOrder.delivery.blockDischargeEnd === null) {
      return 4;
    } else if (purchaseOrder.delivery.damageFine === undefined || purchaseOrder.delivery.damageFine === null) {
      return 5;
    } else if (purchaseOrder.delivery.lateReturnFine === undefined || purchaseOrder.delivery.lateReturnFine === null) {
      return 6;
    } else {
      return 7;
    }
  }
}
