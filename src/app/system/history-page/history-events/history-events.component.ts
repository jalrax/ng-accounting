import {Component, Input, OnInit} from '@angular/core';
import {SERTEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'sert-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() events: SERTEvent[] = [];

  constructor() {
  }

  ngOnInit() {
    this.events.forEach((event) => {
      event.catName = this.categories.find((cat) => cat.id === event.category).name;
    });
  }

  getEventClass(event: SERTEvent) {
    return {
      'label': true,
      'label-danger': event.type === 'outcome',
      'label-success': event.type === 'income'
    };
  }
}
