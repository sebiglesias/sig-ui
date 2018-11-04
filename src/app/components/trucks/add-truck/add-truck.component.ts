import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TruckService} from '../../../services/truck.service';
import {Router} from '@angular/router';
import {ContainerService} from '../../../services/container.service';
import {Container} from '../../../models/container';
import {validationMessages} from '../../../models/validationMessages';

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
  containers: Container[] = [];
  validationMessages: any;

  ngOnInit() {

    this.validationMessages = validationMessages;
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
    this.containerService.getContainerById(truck.container).subscribe(container => {
      this.truckService.createTruck(truck, container);
    });
  }

  goToContainer() {
    this.router.navigate(['add-container']);
  }
}
