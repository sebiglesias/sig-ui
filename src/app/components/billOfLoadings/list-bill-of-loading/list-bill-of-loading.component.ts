import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BillOfLoadingService} from '../../../services/bill-of-loading.service';
import {BillOfLoading} from '../../../models/bill-of-loading';
import * as $ from 'jquery';
import {spanishJson} from '../../../models/spanishJson';

@Component({
  selector: 'app-list-bill-of-loading',
  templateUrl: './list-bill-of-loading.component.html',
  styleUrls: ['./list-bill-of-loading.component.css']
})
export class ListBillOfLoadingComponent implements OnInit {

  billOfLoadings: BillOfLoading[];
  dataTable: any;

  constructor(private router: Router, private billOfLoadingService: BillOfLoadingService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.billOfLoadingService.getAllBillOfLoadings()
      .subscribe( data => {
        this.billOfLoadings = data;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable({
          'language': {
            'url': spanishJson
          }
        });
      });
  }

  editBillOfLoading(billOfLoading: BillOfLoading): void {
    localStorage.removeItem('editBillOfLoadingId');
    localStorage.setItem('editBillOfLoadingId', billOfLoading.id.toString());
    this.router.navigate(['edit-bill-of-loading']);
  }

  addBillOfLoading(): void {
    this.router.navigate(['add-bill-of-loading']);
  }
}
