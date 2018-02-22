import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {BillPageComponent} from './bill-page/bill-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {PlanningPageComponent} from './planning-page/planning-page.component';
import {RecordsPageComponent} from './records-page/records-page.component';
import {HistoryDetailsComponent} from './history-page/history-details/history-details.component';
import {AuthGuardService} from '../shared/services/auth-guard.service';
import {NotFoundComponent} from '../shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: SystemComponent, canActivate: [AuthGuardService], children: [
      {path: 'bill', component: BillPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {path: 'planning', component: PlanningPageComponent},
      {path: 'records', component: RecordsPageComponent},
      {path: 'history/:id', component: HistoryDetailsComponent}
    ]
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class SystemRoutingModule {
}
