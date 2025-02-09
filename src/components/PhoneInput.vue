<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { createPhoneValidator } from '@/composables/validation'

const props = defineProps<{
  modelValue: string
  errorMessage?: string
  name: string
}>()

const errorMessage = computed(() => props.errorMessage ?? '')

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'validation', result: { isValid: boolean; error?: string }): void
}>()

const isTouched = ref(false)
const hasError = ref(false)
const validator = createPhoneValidator()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const formattedValue = validator.formatPhone(target.value)
  emit('update:modelValue', formattedValue)

  if (isTouched.value) {
    const validationResult = validator.validate(formattedValue)
    hasError.value = !validationResult.isValid
    emit('validation', validationResult)
  }
}

const handleBlur = () => {
  isTouched.value = true
  const validationResult = validator.validate(props.modelValue)
  hasError.value = !validationResult.isValid
  emit('validation', validationResult)
}

watch(
  () => props.errorMessage,
  () => {
    if (props.errorMessage) {
      isTouched.value = true
    }
  },
)
</script>

<template>
  <div :class="[$style['form-group'], 'flex flex-column']">
    <label class="text-l mb-30">Телефон</label>
    <div class="flex relative">
      <input
        type="tel"
        :value="modelValue"
        @input="handleInput"
        @blur="handleBlur"
        :class="[
          $style['input-phone'],
          'mb-10 text-s',
          { [$style['error-border']]: hasError || (isTouched && errorMessage) },
        ]"
        placeholder="+7 (___) ___-__-__"
        :name="name"
        maxlength="18"
      />
      <SvgIcon
        v-if="errorMessage"
        :class="[$style.svg, 'absolute']"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#EB5757"
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
      />
    </div>

    <span v-if="!hasError" :class="[$style['required-text'], 'text-xs']">Обязательное поле</span>
    <span v-if="hasError || (isTouched && errorMessage)" :class="[$style.error, 'text-xs']">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style module>
.input-phone {
  color: var(--black);
  border: 1px solid var(--gray-light);
  padding: 16px 18px;
  border-radius: 5px;
  max-width: 386px;
}

.input-phone::placeholder {
  color: var(--gray-dark);
}

.svg {
  left: 250px;
  top: 20px;
}

.error-border {
  border-color: var(--red);
}

.error {
  color: var(--red);
}
</style>
