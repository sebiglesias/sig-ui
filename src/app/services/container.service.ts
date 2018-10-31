import { Injectable } from '@angular/core';
import {Container} from '../models/container';
import {Observable} from 'rxjs/Observable';
import {dataBaseUrl} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ContainerService {

  containerUrl = dataBaseUrl + '/Container';

  constructor(private http: HttpClient) { }

  createContainer(container: Container): Observable<Container> {
    return this.http.post<Container>(this.containerUrl, container);
  }

  getAllContainers(): Observable<Container[]> {
    return this.http.get<Container[]>(this.containerUrl);
  }

  getContainerById(containerId: string): Observable<Container> {
    return this.http.get<Container>(this.containerUrl + '/' + String(containerId));
  }

  updateContainer(containerToUpdate: Container): Observable<Boolean> {
    return this.http.put<Boolean>(this.containerUrl, containerToUpdate);
  }
}
