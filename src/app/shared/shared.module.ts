import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';

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
    NgxChartsModule
  ],
  declarations: []
})
export class SharedModule {
}
