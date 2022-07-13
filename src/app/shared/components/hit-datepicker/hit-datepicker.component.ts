import { Component, forwardRef, Input } from '@angular/core'
import { AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { NbComponentSize, NbIconComponent, NbInputDirective, NbSpinnerDirective } from '@nebular/theme'

@Component({
  selector: 'hit-datepicker',
  templateUrl: './hit-datepicker.component.html',
  styleUrls: ['./hit-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HitDatepickerComponent),
      multi: true,
    },
  ],
})
export class HitDatepickerComponent {
  @Input() control: AbstractControl
  @Input() label: string
  // General HTMLInputTag inputs
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
  @Input() format: string = 'dd/MM/yyyy'

  value: Date
  isDisabled: boolean

  onChange = (_: any) => {}
  onTouch = () => {}

  onInput(value: any) {
    this.onTouch()
    this.onChange(value)
  }

  inputChanged(value: any) {
    if (!value) {
      this.onInput(null!)
      this.value = null!
    }
  }

  writeValue(value: any): void {
    if (typeof value === 'string') {
      this.value = new Date(!value.toLowerCase().includes('z') ? value + 'Z' : value)
    } else {
      this.value = value
    }
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
