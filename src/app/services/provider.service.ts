import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {ProviderCompany} from '../models/company';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProviderService {

  providerCompany = environment.dataBaseUrl + '/Company';

  constructor(private http: HttpClient) {}

  createNewProvider(name: string): Observable<ProviderCompany> {
    return this.http.put<ProviderCompany>(this.providerCompany, {name: name});
  }

  editProvider(id: number, newName: string): Observable<boolean> {
    return this.http.post<boolean>(this.providerCompany, {id: id, name: newName});
  }

  getProviders(): Observable<ProviderCompany[]> {
    return this.http.get<ProviderCompany[]>(this.providerCompany);
  }

  getProviderCompanyById(id: number): Observable<ProviderCompany> {
    return this.http.get<ProviderCompany>(this.providerCompany + '/' + String(id));
  }

}
