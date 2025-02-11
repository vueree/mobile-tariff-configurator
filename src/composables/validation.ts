import type { ValidationResult, PhoneValidationOptions } from '@/types'

export const PHONE_PATTERNS = {
  BASIC: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
  DIGITS_ONLY: /\d/g,
  CLEAN_PHONE: /\D/g,
}

export const VALIDATION_MESSAGES = {
  PHONE: {
    REQUIRED: 'Телефон обязателен',
    INVALID_FORMAT: 'Неверный формат телефона',
  },
}

export class PhoneValidator {
  private pattern: RegExp
  private required: boolean

  constructor(options: PhoneValidationOptions = {}) {
    this.pattern = options.customPattern || PHONE_PATTERNS.BASIC
    this.required = options.required ?? true
  }

  validate(value: string): ValidationResult {
    if (!this.required && !value) {
      return { isValid: true }
    }

    if (this.required && !value) {
      return {
        isValid: false,
        error: VALIDATION_MESSAGES.PHONE.REQUIRED,
      }
    }

    const isValid = this.pattern.test(value)
    return {
      isValid,
      error: isValid ? undefined : VALIDATION_MESSAGES.PHONE.INVALID_FORMAT,
    }
  }

  formatPhone(value: string): string {
    let cleaned = value.replace(PHONE_PATTERNS.CLEAN_PHONE, '')

    if (!cleaned.startsWith('7')) {
      cleaned = '7' + cleaned
    }

    cleaned = cleaned.slice(0, 11)

    let formatted = '+7 '
    if (cleaned.length > 1) formatted += `(${cleaned.slice(1, 4)}`
    if (cleaned.length > 4) formatted += `) ${cleaned.slice(4, 7)}`
    if (cleaned.length > 7) formatted += `-${cleaned.slice(7, 9)}`
    if (cleaned.length > 9) formatted += `-${cleaned.slice(9, 11)}`

    return formatted
  }
}

export const createPhoneValidator = (options?: PhoneValidationOptions) => {
  return new PhoneValidator(options)
}
