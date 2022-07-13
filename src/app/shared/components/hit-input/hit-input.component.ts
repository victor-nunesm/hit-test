import { Component, forwardRef, Input } from '@angular/core'
import { AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { NbComponentSize, NbIconComponent, NbInputDirective, NbSpinnerDirective } from '@nebular/theme'
import { CurrencyMaskConfig } from 'ngx-currency'
import { HitInputMode } from './models'

@Component({
  selector: 'hit-input',
  templateUrl: './hit-input.component.html',
  styleUrls: ['./hit-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HitInputComponent),
      multi: true,
    },
  ],
})
export class HitInputComponent {
  @Input() control: AbstractControl
  @Input() label: string
  // General HTMLInputTag inputs
  @Input() type: string = 'text'
  @Input() placeholder: string = ''
  @Input() disabled: boolean = false
  @Input() readonly: boolean = false
  // Nebular related inputs
  @Input() spinnerStatus: typeof NbSpinnerDirective.prototype.spinnerStatus
  @Input() spinnerMessage: string = ''
  @Input() spinnerSize: NbComponentSize
  @Input() loading: boolean = false
  @Input() status: typeof NbInputDirective.prototype.status
  @Input() prefixIcon: string
  @Input() prefixIconStatus: typeof NbIconComponent.prototype.status
  @Input() suffixIcon: string
  @Input() suffixIconStatus: typeof NbIconComponent.prototype.status
  @Input() fieldSize: NbComponentSize = 'medium'
  @Input() shape: typeof NbInputDirective.prototype.shape = 'rectangle'
  // Ngx Mask related inputs
  @Input() mask: string = ''
  @Input() dropSpecialCharacters: boolean = true
  // Ngx Currency Mask related inputs
  @Input() currencyMask: boolean = false
  @Input() currencyMaskConfig: Partial<CurrencyMaskConfig> = {
    prefix: '',
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    nullable: true,
    precision: 3,
  }
  @Input() inputMode: HitInputMode = HitInputMode.GENERAL

  _inputMode = HitInputMode

  value: string
  isDisabled: boolean

  onChange = (_: any) => {}
  onTouch = () => {}

  onInput(value: any) {
    this.onTouch()
    this.onChange(value)
  }

  writeValue(value: any): void {
    this.value = value
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }
}
