import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ContainerService} from '../../../services/container.service';
import {Container} from '../../../models/container';
import * as $ from 'jquery';
import {spanishJson} from '../../../models/spanishJson';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css']
})
export class ListContainerComponent implements OnInit {

  containers: Container[];
  dataTable: any;

  constructor(private router: Router, private containerService: ContainerService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.containerService.getAllContainers()
      .subscribe( data => {
        this.containers = data;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable({
          'language': {
            'url': spanishJson
          }
        });
      });
  }

  editContainer(container: Container): void {
    localStorage.removeItem('editContainerId');
    localStorage.setItem('editContainerId', container.id.toString());
    this.router.navigate(['edit-container']);
  }

  addContainer(): void {
    this.router.navigate(['add-container']);
  }
}
