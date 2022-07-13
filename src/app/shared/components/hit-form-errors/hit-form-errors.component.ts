import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FORM_ERROR_MESSAGES } from '@core/constants'

@Component({
  selector: 'hit-form-errors',
  templateUrl: './hit-form-errors.component.html',
  styleUrls: ['./hit-form-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HitFormErrorsComponent {
  @Input() errors: { [key: string]: any } | null
  FORM_ERROR_MESSAGES = FORM_ERROR_MESSAGES
}
