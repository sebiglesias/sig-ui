import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Container} from '../../../models/container';
import {ContainerService} from '../../../services/container.service';
import {TruckService} from '../../../services/truck.service';
import {Truck} from '../../../models/truck';
import {validationMessages} from '../../../models/validationMessages';

@Component({
  selector: 'app-edit-truck',
  templateUrl: './edit-truck.component.html',
  styleUrls: ['./edit-truck.component.css']
})
export class EditTruckComponent implements OnInit {

  truck: Truck;
  editForm: FormGroup;
  containers: Container[];
  validationMessages: any;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private containerService: ContainerService,
              private truckService: TruckService) { }

  ngOnInit() {
    this.validationMessages = validationMessages;
    this.containerService.getAllContainers().subscribe(prods => this.containers = prods);
    const truckId = localStorage.getItem('editTruckId');
    if (!truckId) {
      alert('Invalid action.');
      this.router.navigate(['list-truck']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      driver: ['', Validators.required],
      container: ['', Validators.required],
      licensePlate: ['', Validators.required],
    });
    this.truckService.getTruckById(truckId)
      .subscribe( data => {
        const truckData = {
          id: data.id,
          driver: data.driver,
          licensePlate: data.licensePlate,
          container: data.container.id
        };
        this.editForm.setValue(truckData);
      });
  }

  onSubmit() {
    this.containerService.getContainerById(this.editForm.value.container).subscribe(container => {
      this.truckService.updateTruck(this.editForm.value, container)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['list-truck']);
          },
          error => {
            alert(error);
          });
    });
  }
}
