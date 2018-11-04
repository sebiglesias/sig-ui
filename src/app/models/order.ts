import {Company} from './company';
import {BillOfLoading} from './bill-of-loading';
import {Product} from './product';

export class Order {
  id: number;
  product: Product;
  date: Date;
  company: Company;
}
