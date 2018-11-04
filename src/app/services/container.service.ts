import { Injectable } from '@angular/core';
import {Container} from '../models/container';
import {Observable} from 'rxjs/Observable';
import {dataBaseUrl} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ProductService} from './product.service';
import {Product} from '../models/product';
import {Router} from '@angular/router';

@Injectable()
export class ContainerService {

  containerUrl = dataBaseUrl + '/Container';

  constructor(private http: HttpClient, private productService: ProductService, private router: Router) { }

  createContainer(container: Container, prod: Product) {
    container.product = null;
    this.http.put<Container>(this.containerUrl, container).subscribe( cont => {
      this.updateContainer(cont, prod).subscribe(x => this.router.navigate(['list-container']));
    });
  }

  getAllContainers(): Observable<Container[]> {
    return this.http.get<Container[]>(this.containerUrl);
  }

  getContainerById(containerId: string): Observable<Container> {
    return this.http.get<Container>(this.containerUrl + '/' + String(containerId));
  }

  updateContainer(containerToUpdate: Container, product: Product): Observable<Container> {
    containerToUpdate.product = product;
    return this.http.post<Container>(this.containerUrl, containerToUpdate);
  }
}
