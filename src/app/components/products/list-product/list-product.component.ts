import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: Product[];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts()
      .subscribe( data => {
        this.products = data;
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
