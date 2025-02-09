export interface TariffState {
  minutes: number
  sms: number
  internet: number
  hasRouter: boolean
  phoneNumber: string
}

export interface SliderPoint {
  value: number
  price: number
}

// Типы для валидации
export interface ValidationResult {
  isValid: boolean
  error?: string
}

export interface PhoneValidationOptions {
  required?: boolean
  customPattern?: RegExp
}

export type PriceOption = {
  value: number
  price: number
}
