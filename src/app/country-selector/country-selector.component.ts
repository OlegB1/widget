import {Component, Input, OnInit} from '@angular/core';
import {WidgetService} from '../shared/service/widget-service';
import {PaymentSelectorComponent} from '../payment-selector/payment-selector.component';
import {CoutriesType} from './coutries.type';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html'
})
export class CountrySelectorComponent implements OnInit {
  @Input() public paymentSelector: PaymentSelectorComponent;

  public countries: CoutriesType[];
  public selectedCountry = 'RU';

  constructor(private countryService: WidgetService) {
  }

  ngOnInit() {
    this.countries = this.countryService.getCountry();
    const payment = this.countryService.getPayments('RU');
    this.paymentSelector.setPayments(payment);
  }

  changeCoumtry(ev: { name: string, code: string }) {
    const payment = this.countryService.getPayments(ev.code);
    this.paymentSelector.setPayments(payment);
  }

}
