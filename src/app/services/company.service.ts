import { Injectable } from '@angular/core';
import {Company} from '../models/company';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class CompanyService {

  companies: Company[] = [];
  lastId = 0;

  constructor() { }

  createCompany(company: Company): Observable<Company> {
    if (!company.id) {
      company.id = ++this.lastId;
    }
    this.companies.push(company);
    return of(company);
  }

  getAllCompanies(): Observable<Company[]> {
    return of(this.companies);
  }

  getCompanyById(companyId: number): Observable<Company> {
    if (this.companies.length === 0) {
      return of();
    } else {
      this.companies.map(company => {
        if (company.id === companyId) {
          return of(company);
        }
      });
    }
  }

  updateCompany(companyToUpdate: Company): Observable<Boolean> {
    this.companies.filter(company => company.id === companyToUpdate.id).map(o => o = companyToUpdate);
    return of(true);
  }
}
