import {Company} from './company';

export class ShipmentReport {
  id: number;
  introduced: number;
  terminal: string;
  port: string;
  navyCompany: Company;
  provider: Company;
  loadingPoint: string;
  dockingPoint: string;
  boat: string;
  deliveryPlace: string;
}
