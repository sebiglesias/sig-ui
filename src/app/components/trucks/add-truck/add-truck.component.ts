import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TruckService} from '../../../services/truck.service';
import {Router} from '@angular/router';
import {ContainerService} from '../../../services/container.service';
import {Container} from '../../../models/container';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.css']
})
export class AddTruckComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private truckService: TruckService,
              private containerService: ContainerService) { }

  addForm: FormGroup;
  containers: Container[];

  ngOnInit() {

    this.containerService.getAllContainers().subscribe( prods => this.containers = prods);

    this.addForm = this.formBuilder.group({
      id: [],
      container: ['', Validators.required],
      driver: ['', Validators.required],
      licensePlate: ['', Validators.required],
    });

  }

  onSubmit() {
    const truck = this.addForm.value;
    const containerById = this.containerService.getContainerById(truck.container);
    containerById.subscribe(prod => {
      truck.container = prod;
      this.truckService.createTruck(truck)
        .subscribe( data => {
          this.router.navigate(['list-truck']);
        });
    });
  }

}
