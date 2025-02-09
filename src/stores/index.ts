import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TariffState } from '../types'

export const useTariffStore = defineStore('tariff', () => {
  // Начальное состояние
  const state = ref<TariffState>({
    minutes: 300,
    sms: 50,
    internet: 10,
    hasRouter: false,
    phoneNumber: '',
  })

  // Константы для расчета цен
  const PRICES = {
    minutes: [
      { value: 100, price: 200 },
      { value: 200, price: 350 },
      { value: 300, price: 500 },
      { value: 600, price: 850 },
    ],
    sms: [
      { value: 0, price: 0 },
      { value: 50, price: 100 },
      { value: 100, price: 170 },
      { value: 150, price: 230 },
    ],
    internet: [
      { value: 5, price: 300 },
      { value: 10, price: 500 },
      { value: 15, price: 700 },
      { value: 25, price: 1000 },
    ],
    router: 100,
  }

  const totalPrice = computed(() => {
    const minutesPrice = PRICES.minutes.find((p) => p.value === state.value.minutes)?.price || 0
    const smsPrice = PRICES.sms.find((p) => p.value === state.value.sms)?.price || 0
    const internetPrice = PRICES.internet.find((p) => p.value === state.value.internet)?.price || 0
    const routerPrice = state.value.hasRouter ? PRICES.router : 0

    return minutesPrice + smsPrice + internetPrice + routerPrice
  })

  function updateMinutes(value: number) {
    state.value.minutes = value
  }

  function updateSms(value: number) {
    state.value.sms = value
  }

  function updateInternet(value: number) {
    state.value.internet = value
  }

  function updateRouter(value: boolean) {
    state.value.hasRouter = value
  }

  function updatePhoneNumber(value: string) {
    state.value.phoneNumber = value
  }

  async function fetchInitialData() {
    try {
      // Имитация задержки сети
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Имитация получения данных с сервера
      const response = {
        minutes: 300,
        sms: 50,
        internet: 10,
        hasRouter: false,
        phoneNumber: '',
      }

      // Обновление state полученными данными
      state.value = response

      return state.value
    } catch (error) {
      console.error('Error fetching initial data:', error)
      throw error
    }
  }

  return {
    state,
    PRICES,
    totalPrice,
    updateMinutes,
    updateSms,
    updateInternet,
    updateRouter,
    updatePhoneNumber,
    fetchInitialData,
  }
})
