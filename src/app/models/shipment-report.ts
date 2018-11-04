import {Company} from './company';

export class ShipmentReport {
  id: number;
  introduced: Date;
  terminal: string;
  port: string;
  navyCompany: Company;
  provider: Company;
  loadingPoint: string;
  dockingPoint: string;
  boat: string;
  deliveryPlace: string;
}
