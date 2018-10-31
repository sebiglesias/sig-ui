import { Injectable } from '@angular/core';
import {Product} from '../models/product';
import {Observable} from 'rxjs/Observable';
import {dataBaseUrl} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProductService {

  productUrl = dataBaseUrl + '/Product';

  constructor(private http: HttpClient) { }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productUrl, product);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(this.productUrl + '/' + String(productId));
  }

  updateProduct(productToUpdate: Product): Observable<Product> {
    return this.http.put<Product>(this.productUrl, productToUpdate);
  }
}
