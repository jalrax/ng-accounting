import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Category} from '../shared/models/category.model';
import {SERTEvent} from '../shared/models/event.model';

@Component({
  selector: 'sert-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  categories: Category[] = [];
  events: SERTEvent[] = [];
  isLoaded = false;
  chartData = [];

  constructor(private categoriesService: CategoriesService,
              private eventsService: EventsService) {
  }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], SERTEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.calculateCartData();
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  private calculateCartData(): void {
    this.chartData = [];
    this.categories.forEach((cat) => {
      const catEvents = this.events.filter((event) => event.category === cat.id && event.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, event) => {
          total += event.amount;
          return total;
        }, 0)
      });
    });
  }
}
