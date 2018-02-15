import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Observable} from 'rxjs/Observable';
import {Bill} from '../shared/models/bill.model';
import {Category} from '../shared/models/category.model';
import {SERTEvent} from '../shared/models/event.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'sert-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: SERTEvent[] = [];
  sub1: Subscription;

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventsService: EventsService) {
  }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], SERTEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  getCategoryCost(category: Category): number {
    const categoryEvents = this.events.filter(
      event => event.category === category.id && event.type === 'outcome');
    return categoryEvents.reduce((total, event) => {
      total += event.amount;
      return total;
    }, 0);
  }

  getCatPercent(category: Category): string {
    return this.getPercent(category) + '%';
  }

  getCatColorClass(category: Category): string {
    const percent = this.getPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  private getPercent(category: Category): number {
    const percent = (100 * this.getCategoryCost(category)) / category.capacity;
    return percent > 100 ? 100 : percent;
  }
}
