import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public amount = 5;
  public currency = 'USD';
  public currencyAmount = `${this.amount} ${this.currency}`
}
