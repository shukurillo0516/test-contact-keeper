<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    type="button"
    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    :class="{ disabled: disabled }"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.disabled {
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
}
</style>
