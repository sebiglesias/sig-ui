import { Injectable } from '@angular/core';
import {Product} from '../models/product';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ProductService {

  products: Product[] = [];
  lastId = 0;

  constructor() { }

  createProduct(product: Product): Observable<Product> {
    if (!product.id) {
      product.id = +this.lastId;
    }
    this.products.push(product);
    return of(product);
  }

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(productId: number): Observable<Product> {
    if (this.products.length === 0) {
      return of();
    } else {
      this.products.map(product => {
        if (product.id === productId) {
          return of(product);
        }
      });
    }
  }

  updateProduct(productToUpdate: Product): Observable<Boolean> {
    this.products.filter(product => product.id === productToUpdate.id).map(o => o = productToUpdate);
    return of(true);
  }
}
