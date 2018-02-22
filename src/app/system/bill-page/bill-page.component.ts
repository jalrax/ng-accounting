import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/delay';

import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/models/bill.model';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'sert-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  currency: any;
  bill: Bill;
  isLoaded = false;

  constructor(private billService: BillService,
              private title: Title,
              private meta: Meta) {
    title.setTitle('Счёт пользователя');
    meta.addTags([
      {name: 'keywords', content: 'счет, курс, валюты'},
      {name: 'description', content: 'Страница счёта'},
    ]);
  }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }
}
