import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { PriceOption } from '@/types'

export function useSliderLogic(
  props: { modelValue: number; options: PriceOption[] },
  emit: (event: 'update:modelValue', value: number) => void,
) {
  const sliderRef = ref<HTMLInputElement | null>(null)
  const isDragging = ref(false)
  const startX = ref(0)
  const currentX = ref(0)
  const rangeWidth = ref(0)

  const sliderValue = computed(() => findIndexByValue(props.modelValue, props.options))

  const thumbColor = computed(() => (sliderValue.value < 2 ? '#000000' : '#7A5CFA'))
  const trackColor = computed(() => (sliderValue.value < 2 ? '#000000' : '#7A5CFA'))

  const fillPercent = computed(() => {
    if (!rangeWidth.value) return 0
    const position = isDragging.value
      ? currentX.value
      : (sliderValue.value / (props.options.length - 1)) * rangeWidth.value
    return (position / rangeWidth.value) * 100
  })

  const thumbStyle = computed(() => {
    if (!rangeWidth.value) return {}

    const stepWidth = rangeWidth.value / (props.options.length - 1)
    const position = isDragging.value ? currentX.value : stepWidth * sliderValue.value
    const clampedPosition = Math.max(0, Math.min(position, rangeWidth.value))

    return {
      left: `${clampedPosition}px`,
      transform: 'translate(-50%, -50%)',
      top: '50%',
      cursor: isDragging.value ? 'grabbing' : 'grab',
      transition: isDragging.value ? 'none' : 'left 0.3s ease',
    }
  })

  function findIndexByValue(value: number, options: PriceOption[]): number {
    return options.findIndex((option) => option.value === value)
  }

  function handleInput(event: Event): void {
    const index = Number((event.target as HTMLInputElement).value)
    emit('update:modelValue', props.options[index].value)
  }

  let resizeTimeout: number | null = null
  function updateRangeWidth(): void {
    if (resizeTimeout) {
      window.clearTimeout(resizeTimeout)
    }

    resizeTimeout = window.setTimeout(() => {
      if (sliderRef.value) {
        rangeWidth.value = sliderRef.value.offsetWidth
      }
    }, 150)
  }

  function startDrag(event: MouseEvent): void {
    if (!sliderRef.value) return

    isDragging.value = true
    startX.value = event.clientX - currentX.value

    document.addEventListener('mousemove', handleDrag, { passive: true })
    document.addEventListener('mouseup', stopDrag)

    event.preventDefault()
  }

  function handleDrag(event: MouseEvent): void {
    if (!isDragging.value || !sliderRef.value) return

    requestAnimationFrame(() => {
      currentX.value = Math.max(0, Math.min(event.clientX - startX.value, rangeWidth.value))

      const stepWidth = rangeWidth.value / (props.options.length - 1)
      const nearestIndex = Math.round(currentX.value / stepWidth)

      if (props.options[nearestIndex]?.value !== props.modelValue) {
        emit('update:modelValue', props.options[nearestIndex].value)
      }
    })
  }

  function stopDrag(): void {
    if (!isDragging.value) return

    isDragging.value = false
    const stepWidth = rangeWidth.value / (props.options.length - 1)
    currentX.value = stepWidth * sliderValue.value

    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', stopDrag)
  }

  onMounted(() => {
    updateRangeWidth()
    window.addEventListener('resize', updateRangeWidth, { passive: true })

    if (sliderRef.value) {
      const stepWidth = rangeWidth.value / (props.options.length - 1)
      currentX.value = stepWidth * sliderValue.value
    }
  })

  onUnmounted(() => {
    if (resizeTimeout) {
      window.clearTimeout(resizeTimeout)
    }
    window.removeEventListener('resize', updateRangeWidth)
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', stopDrag)
  })

  return {
    sliderRef,
    isDragging,
    startX,
    currentX,
    rangeWidth,
    sliderValue,
    thumbColor,
    trackColor,
    fillPercent,
    thumbStyle,
    handleInput,
    startDrag,
    handleDrag,
    stopDrag,
  }
}
