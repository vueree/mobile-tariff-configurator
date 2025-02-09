<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'

defineProps<{ modelValue: boolean }>()
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="checkbox-wrapper">
    <input
      type="checkbox"
      class="checkbox-hidden"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span class="custom-checkbox">
      <SvgIcon
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="white"
        d="M5.13282 7.24966C4.74818 7.60969 4.15019 7.60955 3.76572 7.24934L1.6548 5.27155C1.35942 4.99479 0.900196 4.99398 0.603841 5.26969C0.277265 5.57352 0.276354 6.09039 0.601857 6.39537L3.7654 9.3594C4.15 9.71974 4.74824 9.71974 5.13284 9.3594L13.4023 1.6115C13.7259 1.30827 13.7259 0.794636 13.4023 0.491405C13.1072 0.214951 12.6483 0.214843 12.3531 0.491158L5.13282 7.24966Z"
      />
    </span>
    <slot />
  </label>
</template>

<style scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.checkbox-hidden {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.custom-checkbox {
  width: 24px;
  height: 24px;
  border-radius: 5px;
  background: var(--white);
  border: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
}

.checkbox-hidden:checked + .custom-checkbox {
  background: var(--purple-light);
  border-color: var(--purple-light);
}

.checkbox-hidden:checked + .custom-checkbox svg {
  display: block;
}

.custom-checkbox svg {
  display: none;
}
</style>
