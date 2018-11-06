import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Shipment} from '../../../models/shipment';
import {ShipmentService} from '../../../services/shipment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {TruckService} from '../../../services/truck.service';
import {ContainerService} from '../../../services/container.service';
import {OrderService} from '../../../services/order.service';
import {FineService} from '../../../services/fine.service';
import {DateService} from '../../../date.service';

@Component({
  selector: 'app-view-shipment',
  templateUrl: './view-shipment.component.html',
  styleUrls: ['./view-shipment.component.css']
})
export class ViewShipmentComponent implements OnInit {

  shipment: Shipment;
  editEnterTimeForm: FormGroup;
  editLeaveTimeForm: FormGroup;
  addFineForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private shipmentService: ShipmentService,
              private orderService: OrderService,
              private truckService: TruckService,
              private fineService: FineService,
              private dateService: DateService,
              private containerService: ContainerService) {
  }

  ngOnInit() {
    const params1 = this.route.params;
    this.shipmentService.getShipmentById(Number(params1['_value']['id'])).subscribe(sR => {
      this.shipment = sR;
      this.editEnterTimeForm = this.formBuilder.group({
        enterTime: ['', Validators.required]
      });
      this.editEnterTimeForm.setValue({ enterTime: this.dateService.getDateToISOString(new Date(sR.enterTime))});
      this.editLeaveTimeForm = this.formBuilder.group({
        leaveTime: ['', Validators.required]
      });
      this.editLeaveTimeForm.setValue({ leaveTime: this.dateService.getDateToISOString(new Date(sR.leaveTime))});
      this.addFineForm = this.formBuilder.group({
        id: ['', Validators.required],
        reason: ['', Validators.required],
        amount: ['', Validators.required],
        currency: ['', Validators.required],
      });
    });
  }

  deleteFine(fineId: number) {
    this.shipmentService.deleteFine(fineId, this.shipment.id);
  }

  submitEnterTime() {
    this.shipment.enterTime = new Date(this.editEnterTimeForm.value.enterTime).getTime();
    this.shipmentService.updateShipment(this.shipment, this.shipment.order, this.shipment.truck, this.shipment.container)
      .pipe(first())
      .subscribe(
        data => {
          this.shipmentService.getShipmentById(this.shipment.id).subscribe(x => window.location.reload());
        },
        error => {
          alert(error);
        });
  }

  submitLeaveTime() {
    this.shipment.leaveTime = new Date(this.editLeaveTimeForm.value.leaveTime).getTime();
    this.shipmentService.updateShipment(this.shipment, this.shipment.order, this.shipment.truck, this.shipment.container)
      .pipe(first())
      .subscribe(
        data => {
          this.shipmentService.getShipmentById(this.shipment.id).subscribe(x => window.location.reload());
        },
        error => {
          alert(error);
        });
  }

  submitAddFine() {
    const value = this.addFineForm.value;
    this.fineService.createFine(value).subscribe( fine => {
      this.shipmentService.getShipmentById(this.shipment.id).subscribe( ship => {
        if (ship.fines) {
          ship.fines = ship.fines.concat(fine);
        } else {
          ship.fines = [fine];
        }
        this.shipmentService.updateShipment(ship, ship.order, ship.truck, ship.container)
          .subscribe(x => window.location.reload());
      });
    });
  }
}
