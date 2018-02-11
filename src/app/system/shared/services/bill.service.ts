import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BillService {

  constructor(private http: HttpClient) {
  }

  getBill(): Observable<any> {
    return this.http.get('http://localhost:3000/bill');
  }

  getCurrency(base: string = 'RUB'): Observable<any> {
    return this.http.get(`https://api.fixer.io/latest?base=${base}`);
  }
}
