import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ErrorMessageParserPipe } from './error-message-parser.pipe'
import { HitFormErrorsComponent } from './hit-form-errors.component'

@NgModule({
  declarations: [HitFormErrorsComponent, ErrorMessageParserPipe],
  imports: [CommonModule],
  exports: [HitFormErrorsComponent, ErrorMessageParserPipe],
})
export class HitFormErrorsModule {}
