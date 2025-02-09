<script setup lang="ts">
defineProps<{
  width?: string | number
  height?: string | number
  viewBox?: string
  fill?: string
  d?: string
}>()
</script>

<template>
  <svg :width="width" :height="height" :viewBox="viewBox" :fill="fill">
    <path v-if="d" :d="d" />
  </svg>
</template>
