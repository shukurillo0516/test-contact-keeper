<script setup>
defineProps({
  label: {
    type: String,
  },
  checked: {
    type: Boolean,
  },
});
</script>

<template>
  <div
    class="flex shadow-md px-4 mt-2 items-center rounded border border-gray-200 dark:border-gray-700"
  >
    <input
      id="bordered-radio-1"
      type="radio"
      name="bordered-radio"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      :checked="checked"
    />
    <label
      for="bordered-radio-1"
      class="py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ label }}</label
    >
  </div>
</template>
