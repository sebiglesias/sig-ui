import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BillOfLoading} from '../models/bill-of-loading';
import {dataBaseUrl} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Company} from '../models/company';
import {Container} from '../models/container';
import {Router} from '@angular/router';

@Injectable()
export class BillOfLoadingService {

  billOfLoadingUrl = dataBaseUrl + '/BillOfLoading';

  constructor(private http: HttpClient, private router: Router) { }

  createBillOfLoading(billOfLoading: BillOfLoading, container: Container, company: Company) {
    billOfLoading.company = null;
    billOfLoading.container = null;
    this.http.put<BillOfLoading>(this.billOfLoadingUrl, billOfLoading).subscribe( bof => {
      this.updateBillOfLoading(bof, container, company).subscribe(x => this.router.navigate(['list-bill-of-loading']));
    });
  }

  getAllBillOfLoadings(): Observable<BillOfLoading[]> {
    return this.http.get<BillOfLoading[]>(this.billOfLoadingUrl);
  }

  getBillOfLoadingById(id: string): Observable<BillOfLoading> {
    return this.http.get<BillOfLoading>(this.billOfLoadingUrl + '/' + String(id));
  }

  updateBillOfLoading(bofToUpdate: BillOfLoading, container: Container, company: Company): Observable<Boolean> {
    bofToUpdate.container = container;
    bofToUpdate.company = company;
    return this.http.post<Boolean>(this.billOfLoadingUrl, bofToUpdate);
  }
}
