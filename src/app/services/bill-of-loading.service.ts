import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BillOfLoading} from '../models/bill-of-loading';
import {dataBaseUrl} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BillOfLoadingService {

  billOfLoadingUrl = dataBaseUrl + '/BillOfLoading';

  constructor(private http: HttpClient) { }

  createBillOfLoading(billOfLoading: BillOfLoading): Observable<BillOfLoading> {
    return this.http.post<BillOfLoading>(this.billOfLoadingUrl, billOfLoading);
  }

  getAllBillOfLoadings(): Observable<BillOfLoading[]> {
    return this.http.get<BillOfLoading[]>(this.billOfLoadingUrl);
  }

  getBillOfLoadingById(id: string): Observable<BillOfLoading> {
    return this.http.get<BillOfLoading>(this.billOfLoadingUrl + '/' + String(id));
  }

  updateBillOfLoading(bofToUpdate: BillOfLoading): Observable<Boolean> {
    return this.http.put<Boolean>(this.billOfLoadingUrl, bofToUpdate);
  }
}
