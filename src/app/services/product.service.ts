import {Injectable} from '@angular/core';
import {Product} from '../models/product';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ProductService {

  products: Product[];

  constructor() {
    this.products = JSON.parse(localStorage.getItem('products'));
  }

  createNewProduct(name: string): Observable<boolean> {
    if (this.products === undefined || this.products == null || this.products.length === 0) {
      this.products = [new Product(0, name)];
    } else {
      this.products = this.products.concat(new Product(this.products.length, name));
    }
    localStorage.setItem('products', JSON.stringify(this.products));
    return Observable.of(true);
  }

  editProduct(id: number, newName: string): Observable<boolean> {
    this.products = this.products.map( prod => {
      if (prod.id === id) {
        prod.name = newName;
      }
      return prod;
    });
    localStorage.setItem('products', JSON.stringify(this.products));
    return Observable.of(true);
  }

  getProducts(): Observable<Product[]> {
    return Observable.of(this.products);
  }

}
