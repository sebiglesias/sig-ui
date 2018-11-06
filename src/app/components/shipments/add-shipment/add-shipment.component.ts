import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrderService} from '../../../services/order.service';
import {ContainerService} from '../../../services/container.service';
import {TruckService} from '../../../services/truck.service';
import {ShipmentService} from '../../../services/shipment.service';
import {Order} from '../../../models/order';
import {Truck} from '../../../models/truck';
import {Container} from '../../../models/container';
import {validationMessages} from '../../../models/validationMessages';

@Component({
  selector: 'app-add-shipment',
  templateUrl: './add-shipment.component.html',
  styleUrls: ['./add-shipment.component.css']
})
export class AddShipmentComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private orderService: OrderService,
              private truckService: TruckService,
              private containerService: ContainerService,
              private shipmentService: ShipmentService) { }

  addForm: FormGroup;
  orders: Order[] = [];
  trucks: Truck[] = [];
  containers: Container[] = [];
  validationMessages: any;

  ngOnInit() {
    this.validationMessages = validationMessages;
    this.orderService.getAllOrders().subscribe( prods => this.orders = prods);
    this.truckService.getAllTrucks().subscribe( prods => this.trucks = prods);
    this.containerService.getAllContainers().subscribe( prods => this.containers = prods);

    this.addForm = this.formBuilder.group({
      id: [],
      enterTime: ['', Validators.required],
      leaveTime: ['', Validators.required],
      order: ['', Validators.required],
      truck: ['', Validators.required],
      container: ['', Validators.required],
    });

  }

  onSubmit() {
    const shipment = this.addForm.value;
    const orderById = this.orderService.getOrderById(shipment.order);
    const truckById = this.truckService.getTruckById(shipment.truck);
    const containerById = this.containerService.getContainerById(shipment.container);
    orderById.subscribe(ord => {
      truckById.subscribe( truck => {
          containerById.subscribe( container => {
            shipment.enterTime = new Date(shipment.enterTime).getTime();
            shipment.leaveTime = new Date(shipment.leaveTime).getTime();
            this.shipmentService.createShipment(shipment, ord, truck, container);
          });
        }
      );
    });
  }

  goToContainer() {
    this.router.navigate(['add-container']);
  }

  goToOrder() {
    this.router.navigate(['add-order']);
  }

  goToTruck() {
    this.router.navigate(['add-truck']);
  }
}
