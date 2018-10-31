import { Injectable } from '@angular/core';
import {Company} from '../models/company';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {dataBaseUrl} from '../../environments/environment';

@Injectable()
export class CompanyService {

  companyUrl = dataBaseUrl + '/Company';

  constructor(private http: HttpClient) { }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.companyUrl, company);
  }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companyUrl);
  }

  getCompanyById(companyId: number): Observable<Company> {
    return this.http.get<Company>(this.companyUrl + '/' + String(companyId));
  }

  updateCompany(companyToUpdate: Company): Observable<Boolean> {
    return this.http.put<Boolean>(this.companyUrl, companyToUpdate);
  }
}
