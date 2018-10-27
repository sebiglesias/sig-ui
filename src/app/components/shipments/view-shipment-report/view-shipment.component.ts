import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Fine, Shipment} from '../../../models/shipment';
import {ShipmentService} from '../../../services/shipment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

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
              private shipmentService: ShipmentService) { }

  ngOnInit() {
    const params1 = this.route.params;
    this.shipmentService.getShipmentById(Number(params1['_value']['id'])).subscribe( sR => this.shipment = sR);
    this.editEnterTimeForm = this.formBuilder.group({
      enterTime: ['', Validators.required]
    });
    this.editLeaveTimeForm = this.formBuilder.group({
      leaveTime: ['', Validators.required]
    });
    this.addFineForm = this.formBuilder.group({
      id: ['', Validators.required],
      reason: ['', Validators.required],
      amount: ['', Validators.required],
      currency: ['', Validators.required],
    });
  }

  editFine(fineId: number) { }

  deleteFine(fineId: number) { }

  addFine() { }

  submitEnterTime() {
    const shipmentToUpdate: Shipment = {
      id: this.shipment.id,
      container: this.shipment.container,
      truck: this.shipment.truck,
      enterTime: this.editEnterTimeForm.value['enterTime'],
      leaveTime: this.shipment.leaveTime,
      order: this.shipment.order,
      fine: this.shipment.fine
    };
    this.shipmentService.updateShipment(shipmentToUpdate)
      .pipe(first())
      .subscribe(
        data => {
          this.shipmentService.getShipmentById(this.shipment.id).subscribe( ship => this.shipment = ship);
        },
        error => {
          alert(error);
        });
  }

  submitLeaveTime() {
    const shipmentToUpdate: Shipment = {
      id: this.shipment.id,
      container: this.shipment.container,
      truck: this.shipment.truck,
      enterTime: this.shipment.enterTime,
      leaveTime: this.editLeaveTimeForm.value['leaveTime'],
      order: this.shipment.order,
      fine: this.shipment.fine
    };
    this.shipmentService.updateShipment(shipmentToUpdate)
      .pipe(first())
      .subscribe(
        data => {
          this.shipmentService.getShipmentById(this.shipment.id).subscribe( ship => this.shipment = ship);
        },
        error => {
          alert(error);
        });
  }

  submitAddFine() {
    const value = this.addFineForm.value;
    let fines;
    if (this.shipment.fine && this.shipment.fine.length > 0) {
      const fineLength = this.shipment.fine.length;
      const lastId = this.shipment.fine[fineLength - 1].id;
      value.id = lastId + 1;
      fines = this.shipment.fine.concat(value);
    } else {
      value.id = 0;
      fines = [value];
    }
    const shipmentToUpdate: Shipment = {
      id: this.shipment.id,
      container: this.shipment.container,
      truck: this.shipment.truck,
      enterTime: this.shipment.enterTime,
      leaveTime: this.shipment.leaveTime,
      order: this.shipment.order,
      fine: fines
    };
    this.shipmentService.updateShipment(shipmentToUpdate)
      .pipe(first())
      .subscribe(
        data => {
          this.shipmentService.getShipmentById(this.shipment.id).subscribe( ship => this.shipment = ship);
        },
        error => {
          alert(error);
        });
  }
}
