import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NbDateFnsDateModule } from '@nebular/date-fns'
import { NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSpinnerModule } from '@nebular/theme'
import { NgxMaskModule } from 'ngx-mask'
import { HitFormErrorsModule } from '../hit-form-errors'
import { HitDatepickerComponent } from './hit-datepicker.component'

@NgModule({
  declarations: [HitDatepickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbDatepickerModule,
    NbDateFnsDateModule,
    NbIconModule,
    HitFormErrorsModule,
    NgxMaskModule,
  ],
  exports: [HitDatepickerComponent],
})
export class HitDatepickerModule {}
