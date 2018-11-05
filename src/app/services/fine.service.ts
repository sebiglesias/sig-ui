import {Injectable} from '@angular/core';
import {dataBaseUrl} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Fine} from '../models/shipment';

@Injectable()
export class FineService {

  fineUrl = dataBaseUrl + '/Fine';

  constructor(private http: HttpClient) {
  }

  createFine(fine: Fine): Observable<Fine> {
    fine.id = null;
    return this.http.put<Fine>(this.fineUrl, fine);
  }

  getAllFines(): Observable<Fine[]> {
    return this.http.get<Fine[]>(this.fineUrl);
  }

  getFineById(fineId: number): Observable<Fine> {
    return this.http.get<Fine>(this.fineUrl + '/' + String(fineId));
  }

  updateFine(fineToUpdate: Fine): Observable<Fine> {
    return this.http.post<Fine>(this.fineUrl, fineToUpdate);
  }

  deleteFine(fineToDelete: String): Observable<Fine> {
    return this.http.delete<Fine>(this.fineUrl + '/' + fineToDelete);
  }

}
