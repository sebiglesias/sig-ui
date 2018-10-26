import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TruckService} from '../../../services/truck.service';
import {Truck} from '../../../models/truck';

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.css']
})
export class ListTruckComponent implements OnInit {

  trucks: Truck[];

  constructor(private router: Router, private truckService: TruckService) { }

  ngOnInit() {
    this.truckService.getAllTrucks()
      .subscribe( data => {
        this.trucks = data;
      });
  }

  editTruck(truck: Truck): void {
    localStorage.removeItem('editTruckId');
    localStorage.setItem('editTruckId', truck.id.toString());
    this.router.navigate(['edit-truck']);
  }

  addTruck(): void {
    this.router.navigate(['add-truck']);
  }
}
