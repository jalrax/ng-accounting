import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoaderComponent} from './components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    NotFoundComponent,
    LoaderComponent
  ],
  declarations: [NotFoundComponent, LoaderComponent]
})
export class SharedModule {
}
