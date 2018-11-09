import {Delivery} from './delivery';
import {ProviderCompany} from './company';
import {Product} from './product';

export class PurchaseOrder {
  id: string;
  product: Product;
  provider: ProviderCompany;
  delivery: Delivery;
  date: number;
  quantityInTons: number;

  constructor(id: string) {
    this.id = id;
  }
}
