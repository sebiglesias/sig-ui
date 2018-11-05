import {Injectable} from '@angular/core';
import {Shipment} from '../models/shipment';
import {Observable} from 'rxjs/Observable';
import {dataBaseUrl} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ContainerService} from './container.service';
import {OrderService} from './order.service';
import {FineService} from './fine.service';
import {Container} from '../models/container';
import {Truck} from '../models/truck';
import {Order} from '../models/order';
import {Router} from '@angular/router';

@Injectable()
export class ShipmentService {

  shipmentUrl = dataBaseUrl + '/Shipment';

  constructor(private http: HttpClient,
              private containerService: ContainerService,
              private orderService: OrderService,
              private router: Router,
              private fineService: FineService) {
  }

  createShipment(shipment: Shipment, order: Order, truck: Truck, container: Container){
    shipment.order = null;
    shipment.truck = null;
    shipment.container = null;
    this.http.put<Shipment>(this.shipmentUrl, shipment).subscribe( ship => {
      this.updateShipment(ship, order, truck, container).subscribe(x => this.router.navigate(['list-shipment']));
    });
  }

  getAllShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.shipmentUrl);
  }

  getShipmentById(shipmentId: number): Observable<Shipment> {
    return this.http.get<Shipment>(this.shipmentUrl + '/' + String(shipmentId));
  }

  updateShipment(shipmentToUpdate: Shipment, order: Order, truck: Truck, container: Container): Observable<Shipment> {
    shipmentToUpdate.order = order;
    shipmentToUpdate.truck = truck;
    shipmentToUpdate.container = container;
    shipmentToUpdate.enterTime = new Date(shipmentToUpdate.enterTime).getMilliseconds();
    shipmentToUpdate.leaveTime = new Date(shipmentToUpdate.leaveTime).getMilliseconds();
    return this.http.post<Shipment>(this.shipmentUrl, shipmentToUpdate);
  }

  deleteFine(fineId: number, shipmentId: number) {
    this.getShipmentById(shipmentId).subscribe( shipment => {
      if (shipment.fines) {
        shipment.fines = shipment.fines.filter(fine => String(fine.id) !== String(fineId));
      }
      this.updateShipment(shipment, shipment.order, shipment.truck, shipment.container).subscribe( ship => {
        this.fineService.deleteFine(String(fineId))
          .subscribe(x => this.router.navigate(['view-shipment/' + String(shipmentId)]));
      });
    });
  }
}
