import { Injectable } from '@angular/core';
import {Product} from '../models/product';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ProductService {

  products: Product[] = [];
  lastId = 0;

  constructor() {
    this.products = JSON.parse(localStorage.getItem('products'));
    this.lastId = Number(localStorage.getItem('productLastId'));
    if (this.products === null || this.products === undefined) {
      this.products = [];
    }
    if (this.lastId === null || this.lastId === undefined) {
      this.lastId = 0;
    }
  }

  createProduct(product: Product): Observable<Product> {
    if (!product.id) {
      product.id = ++this.lastId;
      localStorage.setItem('productLastId', JSON.stringify(this.lastId));
    }
    this.products.push(product);
    localStorage.setItem('products', JSON.stringify(this.products));
    return of(product);
  }

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(productId: number): Observable<Product> {
    if (this.products.length === 0) {
      return of();
    } else {
      let productToReturn;
      this.products.forEach((product: Product) => {
        if (product.id === Number(productId)) {
          productToReturn = of(product);
        }
      });
      return productToReturn;
    }
  }

  updateProduct(productToUpdate: Product): Observable<Boolean> {
    const index = this.products.findIndex(shipment => shipment.id === Number(productToUpdate.id));
    if (index === -1) { return of(false); }
    this.products[index] = productToUpdate;
    localStorage.setItem('products', JSON.stringify(this.products));
    return of(true);
  }
}
