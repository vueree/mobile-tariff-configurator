<script setup lang="ts">
defineProps<{
  totalPrice: number
}>()
</script>

<template>
  <button type="submit" :class="$style.button">
    <span class="title-m">{{ totalPrice }} ₽</span>&nbsp;
    <span class="text-m-v2">в месяц</span>
  </button>
</template>

<style module>
.button {
  color: #ffffff;
  background: #7a5cfa;
  border-radius: 15px;
  height: 90px;
  padding: 30px 33px;
  width: fit-content;
  border: none;
  cursor: pointer;
}

.button:hover {
  background: #6347e0;
}

.button:active {
  background: #5234c7;
  border-color: #7a5cfa;
}
</style>
