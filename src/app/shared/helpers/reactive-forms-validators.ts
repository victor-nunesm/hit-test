import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms'

export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl) => {
    const control: AbstractControl = (formGroup as FormGroup).controls[controlName]
    const matchingControl: AbstractControl = (formGroup as FormGroup).controls[matchingControlName]

    if (matchingControl.errors && !matchingControl.errors['mustmatch']) {
      // return if another validator has already found an error on the matchingControl
      return null
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustmatch: true })
    } else {
      matchingControl.setErrors(null)
    }

    return null
  }
}

export function validateCpf(control: FormControl) {
  let numeros, digitos, soma, i, resultado, digitos_iguais
  let cpf = '' + control.value
  cpf = cpf.toString().replace('.', '').replace('.', '').replace('-', '')
  digitos_iguais = 1
  if (cpf === undefined || cpf === null || cpf === '') {
    return null
  }
  if (cpf.length < 11) {
    return { pattern: true }
  }
  for (i = 0; i < cpf.length - 1; i++) {
    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
      digitos_iguais = 0
      break
    }
  }
  if (!digitos_iguais) {
    numeros = cpf.substring(0, 9)
    digitos = cpf.substring(9)
    soma = 0
    for (i = 10; i > 1; i--) {
      soma += numeros.charAt(10 - i) * i
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado != digitos.charAt(0)) {
      return { pattern: true }
    }
    numeros = cpf.substring(0, 10)
    soma = 0
    for (i = 11; i > 1; i--) {
      soma += numeros.charAt(11 - i) * i
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado != digitos.charAt(1)) {
      return { pattern: true }
    }
    return null
  } else return { pattern: true }
}

export function validateCnpj(control: FormControl) {
  let cnpj, tamanho, numeros, digitos, soma, pos, resultado, i
  cnpj = '' + control.value
  cnpj = cnpj.toString().replace('.', '').replace('.', '').replace('/', '').replace('-', '')
  if (cnpj == '') return { pattern: true }

  if (cnpj.length != 14) return { pattern: true }

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == '00000000000000' ||
    cnpj == '11111111111111' ||
    cnpj == '22222222222222' ||
    cnpj == '33333333333333' ||
    cnpj == '44444444444444' ||
    cnpj == '55555555555555' ||
    cnpj == '66666666666666' ||
    cnpj == '77777777777777' ||
    cnpj == '88888888888888' ||
    cnpj == '99999999999999'
  )
    return { pattern: true }

  tamanho = cnpj.length - 2
  numeros = cnpj.substring(0, tamanho)
  digitos = cnpj.substring(tamanho)
  soma = 0
  pos = tamanho - 7
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado != digitos.charAt(0)) return { pattern: true }

  tamanho = tamanho + 1
  numeros = cnpj.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado != digitos.charAt(1)) return { pattern: true }
  return null
}

export const isBiggerThan = (controlName: string, matchingControlName: string): ValidatorFn => {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control: AbstractControl = (formGroup as FormGroup).controls[controlName]
    const matchingControl: AbstractControl = (formGroup as FormGroup).controls[matchingControlName]

    if (matchingControl.errors && !matchingControl.errors['isBiggerThan']) {
      // return if another validator has already found an error on the matchingControl
      return null
    }

    const normalizedControlValue = Number(control.value)
    const normalizedMatchingControlValue = Number(matchingControl.value)
    if (normalizedControlValue == NaN || normalizedMatchingControlValue == NaN) {
      return null
    }

    if (normalizedControlValue > normalizedMatchingControlValue) {
      matchingControl.setErrors({ isBiggerThan: true })
    } else {
      matchingControl.setErrors(null)
    }

    return null
  }
}

export const saleMaxTypeValidator = (controlName: string, matchingControlName: string): ValidatorFn => {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control: AbstractControl = (formGroup as FormGroup).controls[controlName]
    const matchingControl: AbstractControl = (formGroup as FormGroup).controls[matchingControlName]

    if (matchingControl.errors && !matchingControl.errors['saleMaxTypeIsHigherThanSaleMinType']) {
      // return if another validator has already found an error on the matchingControl
      return null
    }

    const normalizedControlValue = Number(control.value)
    const normalizedMatchingControlValue = Number(matchingControl.value)
    if (normalizedControlValue == NaN || normalizedMatchingControlValue == NaN) {
      return null
    }

    if (normalizedControlValue > normalizedMatchingControlValue) {
      matchingControl.setErrors({ saleMaxTypeIsHigherThanSaleMinType: true })
    } else {
      matchingControl.setErrors(null)
    }

    return null
  }
}
