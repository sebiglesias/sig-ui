import {Injectable} from '@angular/core';

@Injectable()
export class DateService {

  constructor() {
  }

  public getDateToString(date: Date) {
    return date.getFullYear() +
      '-' + String('0' + (date.getMonth() + 1)).slice(-2) + '-' + String('0' + String((date.getDate()))).slice(-2);
  }

  public getDateToISOString(date: Date) {
    return date.getFullYear() +
      '-' + String( '0' + (date.getMonth() + 1)).slice(-2) + '-' + String('0' + String((date.getDate()))).slice(-2) + 'T' +
      String( '0' + String(date.getHours())).slice(-2) + ':' + String('0' + String(date.getMinutes())).slice(-2);
  }

}
