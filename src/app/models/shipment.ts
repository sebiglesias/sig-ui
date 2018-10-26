import {Truck} from './truck';
import {Container} from './container';
import {Order} from './order';

export class More {
  reason: string;
  amount: number;
  currency: string;
}

export class Shipment {
  id: number;
  container: Container;
  truck: Truck;
  enterTime: DateTimeFormat;
  leaveTime: DateTimeFormat;
  order: Order;
  more?: More[];
}
