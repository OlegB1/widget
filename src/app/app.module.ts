import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {CountrySelectorComponent} from './country-selector/country-selector.component';
import {PaymentSelectorComponent} from './payment-selector/payment-selector.component';
import {PaymentFormComponent} from './payment-form/payment-form.component';
import {WidgetService} from './shared/service/widget-service';
import {HttpClientModule} from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidationMessageDirective} from './shared/directives/validation-message.directive';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDatepickerModule} from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    CountrySelectorComponent,
    PaymentSelectorComponent,
    PaymentFormComponent,
    ValidationMessageDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [WidgetService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
