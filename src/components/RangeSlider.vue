<script setup lang="ts">
import SliderThumb from './SliderThumb.vue'
import { useSliderLogic } from '@/composables/useSlider'
import type { PriceOption } from '@/types'

const props = defineProps<{
  modelValue: number
  options: PriceOption[]
  label: string
  suffix: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const {
  sliderRef,
  sliderValue,
  thumbColor,
  trackColor,
  fillPercent,
  thumbStyle,
  handleInput,
  startDrag,
} = useSliderLogic(props, emit)
</script>

<template>
  <div :class="[$style['form-group'], 'flex flex-column w-full']">
    <label class="text-l mb-40">{{ label }}</label>
    <div class="flex flex-column">
      <div :class="[$style['slider-container'], 'relative mb-30']">
        <div
          :class="[$style['slider-track'], 'absolute h-10 w-full top-50']"
          :style="{
            '--track-color': trackColor,
            '--fill-percent': `${fillPercent}%`,
          }"
        />
        <input
          ref="sliderRef"
          type="range"
          :min="0"
          :max="options.length - 1"
          :step="1"
          :value="sliderValue"
          @input="handleInput"
          :class="[$style.slider, 'absolute h-10 w-full top-50']"
        />
        <div
          :class="[$style['thumb-container'], 'absolute top-50']"
          :style="thumbStyle"
          @mousedown="startDrag"
        >
          <SliderThumb :color="thumbColor" />
        </div>
      </div>
      <div class="flex justify-between w-full">
        <div
          v-for="(option, index) in options"
          :key="option.value"
          :class="[
            'text-s',
            $style['value-label'],
            {
              [$style.active]: index === sliderValue,
              [$style.first]: index === 0,
              [$style.last]: index === options.length - 1,
            },
          ]"
        >
          <span>{{ option.value }}</span
          >&nbsp;
          <span v-if="index === sliderValue">{{ suffix }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.slider-container {
  height: 62px;
}

.slider-track {
  transform: translateY(-50%);
  border-radius: 3px;
  background: linear-gradient(
    to right,
    var(--track-color, var(--black)) var(--fill-percent, 0%),
    #ddd var(--fill-percent, 0%)
  );
  transition: background 0.2s;
  pointer-events: none;
  will-change: background;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  transform: translateY(-50%);
  margin: 0;
  background: transparent;
  outline: none;
  z-index: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
  background: transparent;
  border: none;
  pointer-events: none;
}

.slider::-moz-range-thumb {
  width: 0;
  height: 0;
  background: transparent;
  border: none;
  pointer-events: none;
}

.thumb-container {
  transform: translateY(-50%);
  cursor: grab;
  will-change: transform;
  z-index: 2;
}

.thumb-container:active {
  cursor: grabbing;
}

.value-label {
  transition: color 0.2s;
}

.value-label.active {
  font-weight: 580;
}
</style>
