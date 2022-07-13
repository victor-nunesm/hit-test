import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'errrorMessageParserPipe',
})
export class ErrorMessageParserPipe implements PipeTransform {
  transform(message: string, errors: { [key: string]: any }): any {
    if (errors) {
      let length = ''
      if (errors['minlength']) {
        length = errors['minlength'].requiredLength
      } else if (errors['maxlength']) {
        length = errors['maxlength'].requiredLength
      }

      return message.replace('{{ value }}', length)
    }
    return message
  }
}
