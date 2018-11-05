import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PaymentType} from './payment.type';

@Component({
  selector: 'app-payment-selector',
  templateUrl: './payment-selector.component.html'
})
export class PaymentSelectorComponent implements OnInit {
  public payments: PaymentType[];

  constructor() {
  }

  ngOnInit() {
  }

  setPayments(payments: Observable<PaymentType[]>) {
    payments.subscribe(data => this.payments = data);
  }

}
