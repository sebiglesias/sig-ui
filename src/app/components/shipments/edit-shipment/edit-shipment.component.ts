import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {OrderService} from '../../../services/order.service';
import {Shipment} from '../../../models/shipment';
import {Order} from '../../../models/order';
import {Truck} from '../../../models/truck';
import {Container} from '../../../models/container';
import {TruckService} from '../../../services/truck.service';
import {ContainerService} from '../../../services/container.service';
import {ShipmentService} from '../../../services/shipment.service';
import {validationMessages} from '../../../models/validationMessages';


@Component({
  selector: 'app-edit-shipment',
  templateUrl: './edit-shipment.component.html',
  styleUrls: ['./edit-shipment.component.css']
})
export class EditShipmentComponent implements OnInit {

  shipment: Shipment;
  editForm: FormGroup;
  orders: Order[];
  trucks: Truck[];
  containers: Container[];
  validationMessages: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private truckService: TruckService,
              private containerService: ContainerService,
              private shipmentService: ShipmentService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.validationMessages = validationMessages;
    this.orderService.getAllOrders().subscribe(prods => this.orders = prods);
    this.truckService.getAllTrucks().subscribe(prods => this.trucks = prods);
    this.containerService.getAllContainers().subscribe(prods => this.containers = prods);
    const shipmentId = localStorage.getItem('editShipmentId');
    if (!shipmentId) {
      alert('Invalid action.');
      this.router.navigate(['list-shipment']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      enterTime: ['', Validators.required],
      leaveTime: ['', Validators.required],
      order: ['', Validators.required],
      truck: ['', Validators.required],
      container: ['', Validators.required],
    });
    this.shipmentService.getShipmentById(Number(shipmentId))
      .subscribe( data => {
        const shipmentData = {
          id: data.id,
          enterTime: data.enterTime,
          leaveTime: data.leaveTime,
          order: data.order.id,
          truck: data.truck.id,
          container: data.container.id
        };
        this.editForm.setValue(shipmentData);
      });
  }

  onSubmit() {
    this.shipmentService.updateShipment(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-shipment']);
        },
        error => {
          alert(error);
        });
  }
}
