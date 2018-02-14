import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {BaseApi} from '../core/base-api';
import {Bill} from '../models/bill.model';

@Injectable()
export class BillService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<any> {
    return this.get('bill');
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }

  getCurrency(base: string = 'RUB'): Observable<any> {
    return this.http.get(`https://api.fixer.io/latest?base=${base}`);
  }
}
