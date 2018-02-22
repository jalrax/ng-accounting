import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';
import * as moment from 'moment';

import {SERTEvent} from '../../shared/models/event.model';
import {EventsService} from '../../shared/services/events.service';
import {Category} from '../../shared/models/category.model';
import {Bill} from '../../shared/models/bill.model';
import {BillService} from '../../shared/services/bill.service';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'sert-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  form: FormGroup;
  message: Message;
  sub1: Subscription;
  sub2: Subscription;

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  @Input() categories: Category[] = [];

  constructor(private fb: FormBuilder,
              private eventsService: EventsService,
              private billService: BillService) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = this.fb.group({
      'category': [1, Validators.required],
      'type': ['outcome', Validators.required],
      'amount': [1, [Validators.required, Validators.min(1)]],
      'description': [null, Validators.required]
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

  onSubmit() {
    const formData = this.form.value;
    const event = new SERTEvent(formData.type, formData.amount, +formData.category,
      moment().format('DD.MM.YYYY HH:mm:ss'), formData.description);
    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (formData.type === 'outcome') {
          if (formData.amount > bill.value) {
            this.showMessage(`Not enough funds. You lack ${formData.amount - bill.value} funds`);
            return;
          } else {
            value = bill.value - formData.amount;
          }
        } else {
          value = bill.value + formData.amount;
        }
        this.sub2 = this.billService.updateBill({value, currency: bill.currency})
          .mergeMap(() => this.eventsService.addEvent(event))
          .subscribe(() => {
            this.form.reset();
          });
      });
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }
}
