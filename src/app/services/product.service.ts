import { Injectable } from '@angular/core';
import {Product, ProductType} from '../models/product';
import {Observable} from 'rxjs/Observable';
import {dataBaseUrl} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ProductTypeService} from './product-type.service';
import {Router} from '@angular/router';
import {Container} from '../models/container';

@Injectable()
export class ProductService {

  productUrl = dataBaseUrl + '/Product';

  constructor(private http: HttpClient, private productTypeService: ProductTypeService, private router: Router) { }

  createProduct(product: ProductToUpdate, productType: ProductType) {
    product.productType = null;
    this.http.put<Product>(this.productUrl, product).subscribe( prod => {
        this.updateProduct(prod, productType).subscribe(x => {
          this.router.navigate(['list-product']);
        });
    });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(this.productUrl + '/' + String(productId));
  }

  updateProduct(productToUpdate: Product, productType: ProductType): Observable<Product> {
      productToUpdate.productType = productType;
      return this.http.post<Product>(this.productUrl, productToUpdate);
  }
}

class ProductToUpdate {
  id: number;
  name: string;
  productType: number;
  containers: Container[];
}
