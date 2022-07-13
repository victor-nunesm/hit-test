import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NbCalendarModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSpinnerModule } from '@nebular/theme'
import { NgxCurrencyModule } from 'ngx-currency'
import { NgxMaskModule } from 'ngx-mask'
import { HitFormErrorsModule } from '../hit-form-errors'
import { HitInputComponent } from './hit-input.component'

@NgModule({
  declarations: [HitInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbCalendarModule,
    NbIconModule,
    NgxMaskModule,
    NgxCurrencyModule,
    HitFormErrorsModule,
  ],
  exports: [HitInputComponent],
})
export class HitInputModule {}
