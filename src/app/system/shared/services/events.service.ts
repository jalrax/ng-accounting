import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {BaseApi} from '../core/base-api';
import {SERTEvent} from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: SERTEvent): Observable<SERTEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<SERTEvent[]> {
    return this.get('events');
  }

  getEventById(id: string): Observable<SERTEvent> {
    return this.get(`events/${id}`);
  }
}
