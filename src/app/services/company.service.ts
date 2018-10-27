import { Injectable } from '@angular/core';
import {Company} from '../models/company';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class CompanyService {

  companies: Company[] = [];
  lastId = 0;

  constructor() {
    this.companies = JSON.parse(localStorage.getItem('companies'));
    this.lastId = Number(localStorage.getItem('companyLastId'));
    if (this.companies === null || this.companies === undefined) {
      this.companies = [];
    }
    if (this.lastId === null || this.lastId === undefined) {
      this.lastId = 0;
    }
  }

  createCompany(company: Company): Observable<Company> {
    if (!company.id) {
      company.id = ++this.lastId;
      localStorage.setItem('companyLastId', JSON.stringify(this.lastId));

    }
    this.companies.push(company);
    localStorage.setItem('companies', JSON.stringify(this.companies));
    return of(company);
  }

  getAllCompanies(): Observable<Company[]> {
    return of(this.companies);
  }

  getCompanyById(companyId: number): Observable<Company> {
    if (this.companies.length === 0) {
      return of();
    } else {
      let companyToReturn;
      this.companies.map(company => {
        if (company.id === Number(companyId)) {
          companyToReturn = of(company);
        }
      });
      return companyToReturn;
    }
  }

  updateCompany(companyToUpdate: Company): Observable<Boolean> {
    const index = this.companies.findIndex(shipment => shipment.id === Number(companyToUpdate.id));
    if (index === -1) { return of(false); }
    this.companies[index] = companyToUpdate;
    localStorage.setItem('companies', JSON.stringify(this.companies));
    return of(true);
  }
}
