import {Company} from './company';
import {Container} from './container';
import {Order} from './order';

export class BillOfLoading {
  id: number;
  container: Container;
  date: Date;
  company: Company;
  order: Order;
}
