<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import Main from "./pages/Main.vue";

const store = useStore();

onMounted(() => {
  store.commit("loadContacts");
});
</script>

<template>
  <Main />
</template>

<style scoped></style>
