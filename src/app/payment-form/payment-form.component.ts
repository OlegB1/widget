import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BsLocaleService} from 'ngx-bootstrap';

function luhnAlgorithm(val: FormControl) {
  const num = val.value;
  const inputNum = num.toString();
  let sum = 0;
  let doubleUp = false;
  for (let i = inputNum.length - 1; i >= 0; i--) {
    const curDigit = parseInt(inputNum.charAt(i));
    if (doubleUp) {
      if ((curDigit * 2) > 9) {
        sum += (curDigit * 2) - 9;
      } else {
        sum += curDigit * 2;
      }
    } else {
      sum += curDigit;
    }
    doubleUp = !doubleUp;
  }
  return (sum % 10) === 0 ? null : {luhnAlgorithm: true};
}

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html'
})

export class PaymentFormComponent implements OnInit {
  @Input() currencyAmount: number;

  public paymentForm = this.fb.group({
    cardholder: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    card: ['', [Validators.required, Validators.pattern('[0-9 ]*'), luhnAlgorithm]],
    exp: ['', Validators.required],
    cvv: ['', [Validators.required, Validators.pattern('[0-9 ]*')]]
  });
  public minDate = new Date();

  constructor(private fb: FormBuilder, private toaster: ToastrService, private localeService: BsLocaleService) {
  }

  ngOnInit() {
    this.localeService.use('en');
    const day = this.minDate.getDate();
    this.minDate.setDate(day + 1);
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      this.toaster.success('Successful!');
    } else {
      this.toaster.error('Error filling form!');
      Object.values(this.paymentForm.controls).forEach((control: FormControl) => {
        control.markAsTouched();
        control.markAsDirty();
      });
    }
  }

  typeError(name: string): boolean {
    return !!(this.paymentForm.controls[name].errors && (this.paymentForm.controls[name].errors['pattern'] ||
      this.paymentForm.controls[name].errors['luhnAlgorithm']) && (this.paymentForm.controls[name].dirty ||
      this.paymentForm.controls[name].touched));
  }

  requiredError(name: string): boolean {
    return !!(this.paymentForm.controls[name].errors && this.paymentForm.controls[name].errors['required'] &&
      (this.paymentForm.controls[name].dirty || this.paymentForm.controls[name].touched));
  }

  onChangeDate(inputEl: HTMLElement) {
    setTimeout(() => {
      inputEl.classList.remove('input-success', 'input-error');
    }, 0);
  }
}
