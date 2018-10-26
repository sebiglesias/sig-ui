import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import {spanishJson} from '../../../models/spanishJson';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: Product[];
  dataTable: any;

  constructor(private router: Router, private productService: ProductService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.productService.getAllProducts()
      .subscribe( data => {
        this.products = data;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable({
          'language': {
            'url': spanishJson
          }
        });
      });
  }

  editProduct(product: Product): void {
    localStorage.removeItem('editProductId');
    localStorage.setItem('editProductId', product.id.toString());
    this.router.navigate(['edit-product']);
  }

  addProduct(): void {
    this.router.navigate(['add-product']);
  }
}
