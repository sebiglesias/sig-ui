import { Injectable } from '@angular/core';
import { ProductType } from '../models/product';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { dataBaseUrl } from '../../environments/environment';

@Injectable()
export class ProductTypeService {

  productTypeUrl = dataBaseUrl + '/ProductType';

  constructor(private http: HttpClient) { }

  createProductType(productType: ProductType): Observable<ProductType> {
    return this.http.post<ProductType>(this.productTypeUrl, productType);
  }

  getAllProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.productTypeUrl);
  }

  getProductTypeById(productId: number): Observable<ProductType> {
    return this.http.get<ProductType>(this.productTypeUrl + '/' + String(productId));
  }

  updateProductType(productToUpdate: ProductType): Observable<ProductType> {
    return this.http.patch<ProductType>(this.productTypeUrl, productToUpdate);
  }
}
