import {Injectable} from '@angular/core';
import {Product} from '../models/product';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProductService {

  productUrl = environment.dataBaseUrl + '/Product';

  constructor(private http: HttpClient) {
  }

  createNewProduct(name: string): Observable<Product> {
    return this.http.put<Product>(this.productUrl, {name: name});
  }

  editProduct(id: number, newName: string): Observable<boolean> {
    return this.http.post<boolean>(this.productUrl, {id: id, name: newName});
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.productUrl + '/' + String(id));
  }

}
