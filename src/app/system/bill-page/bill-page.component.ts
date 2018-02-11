import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import {BillService} from '../shared/services/bill.service';

@Component({
  selector: 'sert-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private billService: BillService) {
  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
