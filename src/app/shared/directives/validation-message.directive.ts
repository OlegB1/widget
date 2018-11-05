import {Directive, Input, HostListener, HostBinding, ElementRef, AfterContentInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Directive({
  selector: '[appValidationMessage]'
})
export class ValidationMessageDirective implements AfterContentInit {

  @Input() inputEl: FormControl;
  isFocused = false;

  constructor(private el: ElementRef) {
  }

  @HostBinding('class.input-success') get validInput(): boolean {
    return (this.isFocused && this.inputEl.valid);
  }

  @HostBinding('class.input-error') get invalidInput(): boolean {
    return (this.isFocused && !this.inputEl.valid);
  }

  ngAfterContentInit() {
    this.inputEl.valueChanges.subscribe(() => {
      this.onFocus();
    });
  }

  @HostListener('focus') onFocus(): void {
    this.isFocused = true;
    this.inputEl.valid === true ? this.el.nativeElement.classList.add('input-success')
      : this.el.nativeElement.classList.add('input-error');
  }

  @HostListener('blur') onBlur(): void {
    this.el.nativeElement.classList.remove('input-success', 'input-error');
  }
}
