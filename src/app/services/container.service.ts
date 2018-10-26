import { Injectable } from '@angular/core';
import {Container} from '../models/container';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ContainerService {

  containers: Container[] = [];
  lastId = 0;

  constructor() {
    this.containers = JSON.parse(localStorage.getItem('containers'));
    this.lastId = Number(localStorage.getItem('containerLastId'));
    if (this.containers === null || this.containers === undefined) {
      this.containers = [];
    }
    if (this.lastId === null || this.lastId === undefined) {
      this.lastId = 0;
    }
  }

  createContainer(container: Container): Observable<Container> {
    if (!container.id) {
      container.id = String(+this.lastId);
    }
    this.containers.push(container);
    localStorage.setItem('containers', JSON.stringify(this.containers));
    return of(container);
  }

  getAllContainers(): Observable<Container[]> {
    return of(this.containers);
  }

  getContainerById(containerId: string): Observable<Container> {
    if (this.containers.length === 0) {
      return of();
    } else {
      let containerToReturn;
      this.containers.map(container => {
        if (container.id === containerId) {
          containerToReturn = of(container);
        }
      });
      return containerToReturn;
    }
  }

  updateContainer(containerToUpdate: Container): Observable<Boolean> {
    const index = this.containers.findIndex(shipment => shipment.id === containerToUpdate.id);
    if (index === -1) { return of(false); }
    this.containers[index] = containerToUpdate;
    localStorage.setItem('containers', JSON.stringify(this.containers));
    return of(true);
  }
}
