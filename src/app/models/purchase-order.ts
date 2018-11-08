import {Delivery} from './delivery';
import {ProviderCompany} from './company';
import {ProductQuantity} from './product';

export class PurchaseOrder {
  id: string;
  products: ProductQuantity[];
  provider: ProviderCompany;
  deliveries: Delivery[];
  date: number;
}
