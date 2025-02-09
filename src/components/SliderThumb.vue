<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string
    size?: number
  }>(),
  {
    color: '#7A5CFA',
    size: 62,
  },
)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="32" cy="32" r="31" :fill="color" stroke="#EEF2F4" stroke-width="2" />
    <path
      d="M17.7071 32.7071L25.2929 40.2929C25.9229 40.9229 27 40.4767 27 39.5858V24.4142C27 23.5233 25.9229 23.0771 25.2929 23.7071L17.7071 31.2929C17.3166 31.6834 17.3166 32.3166 17.7071 32.7071Z"
      fill="white"
    />
    <path
      d="M46.2929 32.7071L38.7071 40.2929C38.0771 40.9229 37 40.4767 37 39.5858V24.4142C37 23.5233 38.0771 23.0771 38.7071 23.7071L46.2929 31.2929C46.6834 31.6834 46.6834 32.3166 46.2929 32.7071Z"
      fill="white"
    />
  </svg>
</template>
