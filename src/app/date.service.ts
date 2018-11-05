import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { }

  public getDateToString(date: Date) {
    return date.getFullYear() + '-' + String( '0' + date.getMonth()).slice(-2) + '-' + String('0' + String((date.getDate() + 1))).slice(-2);
  }

  public getDateToISOString(date: Date) {
    return date.toISOString().substring(0, 16);
  }

}
