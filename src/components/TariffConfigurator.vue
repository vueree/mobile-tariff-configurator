<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTariffStore } from '@/stores'
import PhoneInput from './PhoneInput.vue'
import RangeSlider from './RangeSlider.vue'
import SubmitButton from './SubmitButton.vue'
import CheckboxInput from './CheckboxInput.vue'
import type { ValidationResult } from '@/types'

const store = useTariffStore()
const validationState = ref<ValidationResult>({ isValid: false })
const totalPrice = computed(() => store.totalPrice)

const handlePhoneValidation = (result: ValidationResult) => {
  validationState.value = result
}

const scrollToPhone = () => {
  const phoneInput = document.querySelector('.input-phone')
  if (phoneInput) {
    phoneInput.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }
}

onMounted(async () => {
  await store.fetchInitialData()
})

const onSubmit = () => {
  if (!store.state.phoneNumber) {
    handlePhoneValidation({ isValid: false, error: 'Введите номер телефона' })
    scrollToPhone()
    return
  }

  if (!validationState.value.isValid) {
    scrollToPhone()
    return
  }

  const result = {
    phoneNumber: store.state.phoneNumber,
    minutesCount: store.state.minutes,
    smsCount: store.state.sms,
    internetCount: store.state.internet,
    hasRouter: store.state.hasRouter,
    totalPrice: store.totalPrice,
  }

  alert(JSON.stringify(result, null, 2))
  store.state.phoneNumber = ''
}
</script>

<template>
  <form @submit.prevent="onSubmit" :class="[$style['tariff-form'], 'flex flex-column']">
    <h2 class="title-l m-0">Настройте тариф</h2>

    <PhoneInput
      v-model="store.state.phoneNumber"
      :errorMessage="validationState.error"
      name="phoneNumber"
      class="input-phone"
      @validation="handlePhoneValidation"
    />

    <RangeSlider
      :modelValue="store.state.minutes"
      :options="store.PRICES.minutes"
      label="Минуты"
      suffix="мин."
      @update:modelValue="store.updateMinutes($event)"
    />

    <RangeSlider
      :modelValue="store.state.sms"
      :options="store.PRICES.sms"
      label="СМС"
      suffix="смс"
      @update:modelValue="store.updateSms($event)"
    />

    <RangeSlider
      :modelValue="store.state.internet"
      :options="store.PRICES.internet"
      label="Интернет"
      suffix="ГБ"
      @update:modelValue="store.updateInternet($event)"
    />

    <CheckboxInput :modelValue="store.state.hasRouter" @update:modelValue="store.updateRouter">
      <span class="text-s"> Аренда <b>100</b> ₽/мес. </span>
    </CheckboxInput>

    <SubmitButton :totalPrice="totalPrice" />
  </form>
</template>

<style module>
.tariff-form {
  gap: 90px;
}
</style>
