import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductTypeService} from '../../../../services/product-type.service';
import {ProductType} from '../../../../models/product';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import {spanishJson} from '../../../../models/spanishJson';

@Component({
  selector: 'app-list-product-type',
  templateUrl: './list-product-type.component.html',
  styleUrls: ['./list-product-type.component.css']
})
export class ListProductTypeComponent implements OnInit {

  productTypes: ProductType[];
  dataTable: any;

  constructor(private router: Router, private productTypeService: ProductTypeService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.productTypeService.getAllProductTypes()
      .subscribe( data => {
        this.productTypes = data;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable({
          'language': {
            'url': spanishJson
          }
        });
      });
  }

  editProductType(productType: ProductType): void {
    localStorage.removeItem('editProductTypeId');
    localStorage.setItem('editProductTypeId', productType.id.toString());
    this.router.navigate(['edit-product-type']);
  }

  addProductType(): void {
    this.router.navigate(['add-product-type']);
  }
}
