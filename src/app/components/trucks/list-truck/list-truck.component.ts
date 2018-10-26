import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TruckService} from '../../../services/truck.service';
import {Truck} from '../../../models/truck';
import * as $ from 'jquery';
import {spanishJson} from '../../../models/spanishJson';

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.css']
})
export class ListTruckComponent implements OnInit {

  trucks: Truck[];
  dataTable: any;

  constructor(private router: Router, private truckService: TruckService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.truckService.getAllTrucks()
      .subscribe( data => {
        this.trucks = data;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable({
          'language': {
            'url': spanishJson
          }
        });
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
