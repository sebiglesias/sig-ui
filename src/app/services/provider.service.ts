import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {ProviderCompany} from '../models/company';

@Injectable()
export class ProviderService {

  providers: ProviderCompany[];

  constructor() {
    this.providers = JSON.parse(localStorage.getItem('providers'));
  }

  createNewProvider(name: string): Observable<boolean> {
    if (this.providers === undefined || this.providers == null || this.providers.length === 0) {
      this.providers = [new ProviderCompany(0, name)];
    } else {
      this.providers = this.providers.concat(new ProviderCompany(this.providers.length, name));
    }
    localStorage.setItem('providers', JSON.stringify(this.providers));
    return Observable.of(true);
  }

  editProvider(id: number, newName: string): Observable<boolean> {
    this.providers = this.providers.map( prod => {
      if (prod.id === id) {
        prod.name = newName;
      }
      return prod;
    });
    localStorage.setItem('providers', JSON.stringify(this.providers));
    return Observable.of(true);
  }

  getProviders(): Observable<ProviderCompany[]> {
    return Observable.of(this.providers);
  }

}
